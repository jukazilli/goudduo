import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BrowserNavigation } from '../../app/navigation';
import { NavigationProvider } from '../../app/NavigationProvider';
import { PrototypeApp } from '../../app/PrototypeApp';
import { DemoProvider, useDemoDispatch, useDemoState } from '../../state/DemoProvider';
import * as demoHooks from '../../state/DemoProvider';
import { createDemoState, demoReducer, type DemoAction, type DemoState } from '../../state/model';
import { validatePrescription } from '../../state/training';
import { selectHomeTraining } from '../../state/selectors';
import { createUnfilledPrescription, libraryMatches, normalizeExerciseQuery } from './library-model';

let navigation: BrowserNavigation;
let restoreUUID: (() => void) | undefined;
let restoreCatalogue: (() => void) | undefined;
afterEach(() => { navigation?.dispose(); restoreUUID?.(); restoreUUID = undefined; restoreCatalogue?.(); restoreCatalogue = undefined; });
function setup() {
  history.replaceState(null, '', '/rotinas'); navigation = new BrowserNavigation(window);
  let state: DemoState, dispatch: (action: DemoAction) => void;
  function Probe() { state = useDemoState(); dispatch = useDemoDispatch(); return <PrototypeApp/>; }
  render(<DemoProvider><NavigationProvider navigation={navigation}><Probe/></NavigationProvider></DemoProvider>);
  return { state: () => state!, dispatch: (action: DemoAction) => act(() => dispatch!(action)) };
}
function openEditor(day = 'Dom, dia livre') {
  fireEvent.click(screen.getByRole('button', { name: 'Expandir Rotina de demonstração' }));
  const region = screen.getByRole('region', { name: 'Treinos de Rotina de demonstração' });
  fireEvent.click(within(region).getByRole('tab', { name: day }));
  fireEvent.click(within(region).getByRole('button', { name: day.includes('livre') ? 'Adicionar treino' : 'Ver treino' }));
}
async function openLibrary() {
  fireEvent.click(screen.getByRole('button', { name: 'Adicionar exercício' }));
  await waitFor(() => expect(screen.getByRole('searchbox')).toBeInTheDocument());
}
const search = (value: string) => fireEvent.change(screen.getByRole('searchbox'), { target: { value } });
const row = (id: string) => document.querySelector<HTMLButtonElement>(`[data-exercise-id="${id}"]`)!;

describe('shared catalogue and safe initial prescriptions', () => {
  it('normalizes accents/case/whitespace and searches legitimate names/equipment/muscles', () => {
    const state = createDemoState();
    expect(normalizeExerciseQuery('  ELEVAÇÃO   Demo ')).toBe('elevacao demo');
    expect(libraryMatches(state, 'ELEVAÇÃO').map(entry => entry.id)).toEqual(['demo-raise']);
    expect(libraryMatches(state, 'equipamento SINTETICO')).toHaveLength(9);
    expect(libraryMatches(state, 'grupo sintético').length).toBeGreaterThan(0);
    expect(libraryMatches(state, 'não existe')).toEqual([]);
  });
  it('derives stable suggestions from the same table and handles an empty/malformed catalogue', () => {
    const state = createDemoState();
    expect(libraryMatches(state, '').map(entry => entry.id)).toEqual(Object.keys(state.exercises).slice(0, 4));
    expect(libraryMatches(state, '')[0]).toBe(state.exercises['demo-exercise']);
    expect(libraryMatches({ ...state, exercises: {} }, '')).toEqual([]);
    expect(libraryMatches({ ...state, exercises: { alias: state.exercises['demo-exercise']! } }, '')).toEqual([]);
    expect(new Set(libraryMatches(state, 'demonstração').map(entry => entry.id)).size).toBe(libraryMatches(state, 'demonstração').length);
  });
  it('creates distinct catalogue/instance identities and incomplete required fields for every measurement', () => {
    const state = createDemoState();
    for (const id of ['demo-exercise', 'demo-time', 'demo-distance']) {
      const item = createUnfilledPrescription(state.exercises[id]!, `instance-${id}`);
      expect(item.exerciseId).toBe(id); expect(item.id).not.toBe(id);
      expect(item.sets).toBeNaN(); expect(item.restSeconds).toBeNaN(); expect(item.equipmentId).toBeNull(); expect(item).not.toHaveProperty('loadKg');
      expect(validatePrescription(state, [item])).toBe('invalid-prescription');
    }
  });
});
describe('draft/add boundary', () => {
  it('commits configured additions atomically into the same saved entity/revision and shared selectors', () => {
    let state = demoReducer(createDemoState(), { type: 'draft/open', draftId: 'added-draft', routineId: 'demo-routine', day: 'mon', workoutId: 'demo-workout' });
    const saved = state.workouts['demo-workout']!;
    const newItem = createUnfilledPrescription(state.exercises['demo-time']!, 'new-item');
    state = demoReducer(state, { type: 'draft/add', draftId: 'added-draft', exercise: newItem });
    expect(state.workouts['demo-workout']).toBe(saved);
    state = demoReducer(state, { type: 'draft/update', draftId: 'added-draft', exercise: { ...newItem, measurement: 'time', sets: 2, restSeconds: 0, durationSeconds: 30 } });
    state = demoReducer(state, { type: 'draft/prepare', draftId: 'added-draft' });
    state = demoReducer(state, { type: 'draft/commit', draftId: 'added-draft', name: 'Inclusão salva' });
    expect(state.workouts['demo-workout']).toMatchObject({ revision: 2, name: 'Inclusão salva' });
    expect(state.workouts['demo-workout']!.exercises).toHaveLength(2); expect(state.drafts['added-draft']).toBeUndefined();
    expect(selectHomeTraining(state).workout).toBe(state.workouts['demo-workout']); expect(saved.exercises).toHaveLength(1);
  });
  function opened() { return demoReducer(createDemoState(), { type: 'draft/open', draftId: 'library-draft', routineId: 'demo-routine', day: 'sun', workoutId: 'new-workout' }); }
  const addition = (state: DemoState, id = 'instance') => ({ type: 'draft/add' as const, draftId: 'library-draft', exercise: createUnfilledPrescription(state.exercises['demo-exercise']!, id) });
  it('accepts incomplete input in the correct draft, rejects duplicates and allows reinclusion after removal', () => {
    let state = opened(), saved = state.workouts;
    state = demoReducer(state, addition(state));
    const duplicate = demoReducer(state, addition(state, 'other-instance'));
    expect(duplicate.drafts['library-draft']!.issue).toBe('duplicate-exercise'); expect(duplicate.drafts['library-draft']!.exercises).toHaveLength(1);
    state = demoReducer(state, { type: 'draft/remove', draftId: 'library-draft', itemId: 'instance' });
    state = demoReducer(state, addition(state, 'reinserted'));
    expect(state.drafts['library-draft']!.exercises[0]!.id).toBe('reinserted'); expect(state.workouts).toBe(saved);
  });
  it('rejects nonexistent catalogue IDs/missing drafts and never creates a saved prescription', () => {
    const state = opened(), input = addition(state);
    const rejected = demoReducer(state, { ...input, exercise: { ...input.exercise, exerciseId: 'missing' } });
    expect(rejected.drafts['library-draft']!.issue).toBe('invalid-prescription'); expect(rejected.drafts['library-draft']!.exercises).toEqual([]);
    expect(rejected.workouts).toBe(state.workouts); expect(demoReducer(state, { ...input, draftId: 'missing' })).toBe(state);
  });
  it('rejects changed bindings, stale revisions and shared prescriptions before any inclusion', () => {
    let state = demoReducer(createDemoState(), { type: 'draft/open', draftId: 'library-draft', routineId: 'demo-routine', day: 'mon', workoutId: 'demo-workout' });
    const saved = state.workouts['demo-workout']!;
    const stale: DemoState = { ...state, workouts: { ...state.workouts, [saved.id]: { ...saved, revision: 2 } } };
    expect(demoReducer(stale, addition(stale)).drafts['library-draft']!.issue).toBe('stale-revision');
    const shared: DemoState = { ...state, routines: { ...state.routines, 'demo-routine': { ...state.routines['demo-routine']!, days: { mon: saved.id, tue: saved.id } } } };
    expect(demoReducer(shared, addition(shared)).drafts['library-draft']!.issue).toBe('shared-workout-pending');
    state = demoReducer(state, { type: 'training/unlink', routineId: 'demo-routine', day: 'mon', workoutId: saved.id, revision: 1 });
    expect(demoReducer(state, addition(state)).drafts['library-draft']!.issue).toBe('binding-changed');
  });
});
describe('real contextual Library', () => {
  it('renders an empty shared catalogue without fabricated results or success', async () => {
    const view = setup(); openEditor();
    const snapshot: DemoState = { ...view.state(), exercises: {} };
    const spy = vi.spyOn(demoHooks, 'useDemoState').mockReturnValue(snapshot); restoreCatalogue = () => spy.mockRestore();
    await openLibrary();
    expect(document.querySelectorAll('[data-exercise-id]')).toHaveLength(0);
    expect(screen.getByText('Nenhum exercício encontrado.')).toBeInTheDocument();
    expect(screen.queryByText('Adicionado', { exact: true })).not.toBeInTheDocument();
  });
  it('does not report success when a generated instance collides and the reducer rejects inclusion', async () => {
    const view = setup(); openEditor('Seg, com treino');
    const draft = Object.values(view.state().drafts)[0]!, collision = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    view.dispatch({ type: 'draft/replace-exercises', draftId: draft.id, exercises: [{ ...draft.exercises[0]!, id: collision }] });
    const spy = vi.spyOn(crypto, 'randomUUID').mockReturnValue(collision); restoreUUID = () => spy.mockRestore();
    await openLibrary(); search('Elevação'); fireEvent.click(row('demo-raise'));
    expect(view.state().drafts[draft.id]!.exercises).toHaveLength(1);
    expect(screen.queryByText('Adicionado', { exact: true })).not.toBeInTheDocument();
    expect(within(screen.getByRole('dialog')).getByText(/Revise os parâmetros/)).toBeInTheDocument(); expect(row('demo-raise')).toHaveAttribute('aria-disabled', 'false');
  });
  it('acknowledges actual additions, blocks double taps, retains query and clears transient feedback', async () => {
    const view = setup(); openEditor(); await openLibrary(); search('ELEVAÇÃO'); const saved = view.state().workouts;
    expect(document.querySelectorAll('[data-exercise-id]')).toHaveLength(1);
    fireEvent.click(row('demo-raise')); fireEvent.click(row('demo-raise'));
    expect(Object.values(view.state().drafts)[0]!.exercises).toHaveLength(1);
    expect(row('demo-raise')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('dialog')).toBeInTheDocument(); expect(screen.getByRole('searchbox')).toHaveValue('ELEVAÇÃO');
    await waitFor(() => expect(screen.getByText('Adicionado', { exact: true })).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('Adicionado', { exact: true })).not.toBeInTheDocument(), { timeout: 2500 });
    expect(row('demo-raise')).toHaveAttribute('aria-disabled', 'true'); expect(view.state().workouts).toBe(saved);
  });
  it('reacts to removal without a cache and reinserts a new instance while preserving other edits', async () => {
    const view = setup(); openEditor(); await openLibrary(); search('Agachamento'); fireEvent.click(row('demo-squat'));
    const draft = Object.values(view.state().drafts)[0]!, first = draft.exercises[0]!;
    view.dispatch({ type: 'draft/update', draftId: draft.id, exercise: { ...first, sets: 4 } });
    view.dispatch({ type: 'draft/remove', draftId: draft.id, itemId: first.id });
    expect(row('demo-squat')).toHaveAttribute('aria-disabled', 'false'); fireEvent.click(row('demo-squat'));
    const updated = view.state().drafts[draft.id]!;
    expect(updated.exercises).toHaveLength(1); expect(updated.exercises[0]!.id).not.toBe(first.id);
    search('não existe'); expect(screen.getByText('Nenhum exercício encontrado.')).toBeInTheDocument();
  });
  it('keeps additions isolated across drafts and resets query after full close/reopen', async () => {
    const view = setup(); openEditor(); await openLibrary(); search('Elevação'); fireEvent.click(row('demo-raise'));
    const first = Object.values(view.state().drafts)[0]!;
    fireEvent.keyDown(document, { key: 'Escape' }); await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await openLibrary(); expect(screen.getByRole('searchbox')).toHaveValue(''); search('Elevação'); expect(row('demo-raise')).toHaveAttribute('aria-disabled', 'true');
    fireEvent.keyDown(document, { key: 'Escape' }); await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    act(() => navigation.back()); await waitFor(() => expect(location.pathname).toBe('/rotinas'));
    const region = screen.getByRole('region', { name: 'Treinos de Rotina de demonstração' });
    fireEvent.click(within(region).getByRole('tab', { name: 'Seg, com treino' })); fireEvent.click(within(region).getByRole('button', { name: 'Ver treino' }));
    await openLibrary(); search('Elevação'); expect(row('demo-raise')).toHaveAttribute('aria-disabled', 'false');
    expect(view.state().drafts[first.id]!.exercises).toHaveLength(1);
  });
  it('does not acknowledge a blocked stale context or touch another saved revision', async () => {
    const view = setup(); openEditor('Seg, com treino'); await openLibrary(); search('Elevação');
    const workout = view.state().workouts['demo-workout']!;
    view.dispatch({ type: 'workout/commit', routineId: 'demo-routine', day: 'mon', workout: { ...workout, revision: 2 } });
    expect(row('demo-raise')).toHaveAttribute('aria-disabled', 'true'); fireEvent.click(row('demo-raise'));
    expect(screen.queryByText('Adicionado', { exact: true })).not.toBeInTheDocument();
    expect(Object.values(view.state().drafts)[0]!.exercises).toHaveLength(1);
    expect(view.state().workouts['demo-workout']!.revision).toBe(2);
  });
});
