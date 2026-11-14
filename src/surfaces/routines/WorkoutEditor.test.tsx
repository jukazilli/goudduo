import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { BrowserNavigation } from '../../app/navigation';
import { NavigationProvider } from '../../app/NavigationProvider';
import { PrototypeApp } from '../../app/PrototypeApp';
import { DemoProvider, useDemoDispatch, useDemoState } from '../../state/DemoProvider';
import type { DemoAction, DemoState } from '../../state/model';
import { selectHomeTraining } from '../../state/selectors';
import { formatRest, parseNumeric, parseRest } from './editor-fields';

let navigation: BrowserNavigation;
afterEach(() => navigation?.dispose());
function setup() {
  history.replaceState(null, '', '/rotinas'); navigation = new BrowserNavigation(window);
  let state: DemoState, dispatch: (action: DemoAction) => void;
  function Probe() { state = useDemoState(); dispatch = useDemoDispatch(); return <PrototypeApp/>; }
  render(<DemoProvider><NavigationProvider navigation={navigation}><Probe/></NavigationProvider></DemoProvider>);
  return { state: () => state!, dispatch: (action: DemoAction) => act(() => dispatch!(action)) };
}
function openPrimary(day?: string) {
  fireEvent.click(screen.getByRole('button', { name: 'Expandir Rotina de demonstração' }));
  const region = screen.getByRole('region', { name: 'Treinos de Rotina de demonstração' });
  if (day) fireEvent.click(within(region).getByRole('tab', { name: day }));
  fireEvent.click(within(region).getByRole('button', { name: day === 'Dom, dia livre' ? 'Adicionar treino' : 'Ver treino' }));
}
const change = (label: string, value: string) => fireEvent.change(screen.getByLabelText(label, { exact: true, selector: 'input,select' }), { target: { value } });

describe('Editor display adapters', () => {
  it('round-trips rest in seconds and rejects malformed/overflow timestamps without guessing units', () => {
    for (const seconds of [0, 59, 60, 3599, 3600, 90061, 360000]) expect(parseRest(formatRest(seconds))).toBe(seconds);
    for (const text of ['', '60', '1:30', '00:60:00', '00:00:60', '-1:00:00', '00:00:01.5', '999999999999999:00:00']) expect(parseRest(text)).toBeNaN();
    expect(formatRest(-1)).toBe(''); expect(formatRest(Number.NaN)).toBe('');
    expect(parseNumeric('2,5')).toBe(2.5); expect(parseNumeric('2.5')).toBe(2.5);
    for (const text of ['', '1e3', '-2', '2x', 'Infinity']) expect(parseNumeric(text)).toBeNaN();
  });
});
describe('real Workout Editor integrated with one reducer', () => {
  it('preserves Back edits, confirms discard, and removes only that draft while keeping saved data', async () => {
    const view = setup(); openPrimary(); const saved = view.state().workouts;
    const draft = Object.values(view.state().drafts)[0]!;
    view.dispatch({ type: 'draft/open', routineId: 'demo-routine', day: 'thu', workoutId: 'demo-primary-thu', draftId: 'other-editor' });
    change('Séries', '5');
    act(() => navigation.back()); await waitFor(() => expect(location.pathname).toBe('/rotinas'));
    fireEvent.click(screen.getByRole('button', { name: 'Ver treino' })); expect(screen.getByLabelText('Séries')).toHaveValue('5');
    fireEvent.click(screen.getByRole('button', { name: 'Descartar rascunho' }));
    await waitFor(() => expect(screen.getByRole('dialog', { name: 'Descartar rascunho?' })).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Continuar editando' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(view.state().drafts[draft.id]!.exercises[0]!.sets).toBe(5);
    fireEvent.click(screen.getByRole('button', { name: 'Descartar rascunho' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Descartar alterações' })).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Descartar alterações' }));
    await waitFor(() => expect(location.pathname).toBe('/rotinas'));
    expect(view.state().drafts[draft.id]).toBeUndefined(); expect(view.state().drafts['other-editor']).toBeDefined(); expect(view.state().workouts).toBe(saved);
  });
  it('edits independent repetition fields, optional load, rest and equipment by ID, keeping saved data isolated', () => {
    const view = setup(); openPrimary(); const saved = view.state().workouts['demo-workout'];
    change('Séries', '3'); change('Rep min', '8'); change('Rep max', '12'); change('Carga (kg)', '12,5');
    change('Descanso (HH:MM:SS)', '00:01:30');
    const currentDraft = Object.values(view.state().drafts)[0]!;
    view.dispatch({ type: 'draft/update', draftId: currentDraft.id, exercise: { ...currentDraft.exercises[0]!, equipmentId: 'demo-equipment' } });
    expect(screen.getByLabelText('Equipamento')).toHaveAttribute('readonly');
    expect(screen.getByLabelText('Equipamento')).toHaveValue('Equipamento sintético');
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    const item = Object.values(view.state().drafts)[0]!.exercises[0]!;
    expect(item).toMatchObject({ id: 'demo-item', exerciseId: 'demo-exercise', sets: 3, repsMin: 8, repsMax: 12, loadKg: 12.5, restSeconds: 90, equipmentId: 'demo-equipment' });
    expect(view.state().workouts['demo-workout']).toBe(saved);
    change('Carga (kg)', ''); expect(Object.values(view.state().drafts)[0]!.exercises[0]).not.toHaveProperty('loadKg');
    expect(document.querySelectorAll('[data-header="editor"]')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Adicionar substituição' })).toBeDisabled();
  });
  it('blocks empty/invalid intermediate fields and reversed repetition bounds rather than saving old values', () => {
    const view = setup(); openPrimary(); const saved = view.state().workouts;
    change('Séries', ''); expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();
    expect(Object.values(view.state().drafts)[0]!.exercises[0]!.sets).toBeNaN();
    change('Séries', '2'); change('Descanso (HH:MM:SS)', '00:99:00'); expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();
    change('Descanso (HH:MM:SS)', '00:00:30'); change('Rep min', '10'); change('Rep max', '9');
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();
    change('Rep max', '12'); expect(screen.getByRole('button', { name: 'Salvar' })).toBeEnabled();
    expect(view.state().workouts).toBe(saved);
  });
  it('uses time/distance fields, preserves active identity through reordering and removes only the chosen instance', () => {
    const view = setup(); fireEvent.click(screen.getByRole('button', { name: 'Expandir Alternativa demo' }));
    fireEvent.click(screen.getByRole('button', { name: 'Ver treino' }));
    fireEvent.click(screen.getByRole('button', { name: 'Próximo exercício' }));
    change('Duração (s)', '45'); expect(screen.queryByLabelText('Rep min', { exact: true })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Opções do exercício' })); fireEvent.click(screen.getByRole('button', { name: 'Mover para cima' }));
    expect(Object.values(view.state().drafts)[0]!.exercises[0]).toMatchObject({ id: 'demo-multi-time', durationSeconds: 45 });
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Próximo exercício' })); fireEvent.click(screen.getByRole('button', { name: 'Próximo exercício' }));
    change('Distância (m)', '250'); expect(screen.queryByLabelText('Duração (s)', { exact: true })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Opções do exercício' })); fireEvent.click(screen.getByRole('button', { name: 'Excluir exercício' }));
    expect(Object.values(view.state().drafts)[0]!.exercises.map(item => item.id)).toEqual(['demo-multi-time', 'demo-multi-reps']);
    expect(view.state().workouts['demo-multi']!.exercises).toHaveLength(3);
  });
  it('requires single confirmation, allows continuing/cancelling naming and returns only after real atomic commit', async () => {
    const view = setup(); openPrimary(); const saved = view.state().workouts;
    change('Séries', '4'); fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    await waitFor(() => expect(screen.getByRole('dialog', { name: 'Confirmar treino' })).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Continuar editando' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(screen.getByLabelText('Séries')).toHaveValue('4'); expect(view.state().workouts).toBe(saved);
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Salvar assim mesmo' })).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Salvar assim mesmo' }));
    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Nome do treino' })).toBeInTheDocument());
    change('Nome do treino', '   '); expect(screen.getByRole('button', { name: 'Salvar treino' })).toBeDisabled(); expect(view.state().workouts).toBe(saved);
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(Object.values(view.state().drafts)[0]!.exercises[0]!.sets).toBe(4);
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Salvar assim mesmo' })).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Salvar assim mesmo' }));
    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Nome do treino' })).toBeInTheDocument());
    change('Nome do treino', 'Treino revisado'); fireEvent.click(screen.getByRole('button', { name: 'Salvar treino' }));
    await waitFor(() => expect(location.pathname).toBe('/rotinas'));
    expect(view.state().workouts['demo-workout']).toMatchObject({ name: 'Treino revisado', revision: 2 });
    expect(selectHomeTraining(view.state())).toMatchObject({ status: 'ready', name: 'Treino revisado', revision: 2 });
    expect(view.state().drafts).toEqual({});
  });
  it('opens an empty day honestly, keeps contextual Library safe, and commits new association only after valid domain input', async () => {
    const view = setup(); openPrimary('Dom, dia livre'); const draft = Object.values(view.state().drafts)[0]!;
    expect(screen.getByRole('heading', { name: 'Seu treino está vazio' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar exercício' }));
    await waitFor(() => expect(screen.getByRole('searchbox', { name: 'Pesquisar exercícios na biblioteca' })).toBeInTheDocument());
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(view.state().routines['demo-routine']!.days.sun).toBeUndefined();
    view.dispatch({ type: 'draft/add', draftId: draft.id, exercise: { ...view.state().workouts['demo-workout']!.exercises[0]!, id: 'technical-test-item' } });
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Salvar assim mesmo' })).toBeInTheDocument()); fireEvent.click(screen.getByRole('button', { name: 'Salvar assim mesmo' }));
    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Nome do treino' })).toHaveValue('Treino de domingo'));
    fireEvent.click(screen.getByRole('button', { name: 'Salvar treino' }));
    await waitFor(() => expect(location.pathname).toBe('/rotinas'));
    expect(view.state().routines['demo-routine']!.days.sun).toBe(draft.workoutId);
    expect(view.state().workouts[draft.workoutId]!.revision).toBe(1);
    expect(view.state().selectedDayByRoutine['demo-routine']).toBe('sun');
  });
  it('skips single confirmation for multiple exercises and rejects stale saves with draft intact', async () => {
    const view = setup(); openPrimary('Qui, com treino');
    const saved = view.state().workouts['demo-primary-thu']!;
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Nome do treino' })).toBeInTheDocument());
    expect(screen.queryByRole('button', { name: 'Salvar assim mesmo' })).not.toBeInTheDocument();
    view.dispatch({ type: 'workout/commit', routineId: 'demo-routine', day: 'thu', workout: { ...saved, name: 'Edição concorrente', revision: 2 } });
    fireEvent.click(screen.getByRole('button', { name: 'Salvar treino' }));
    expect(view.state().workouts['demo-primary-thu']!.name).toBe('Edição concorrente');
    expect(Object.values(view.state().drafts)[0]!.issue).toBe('stale-revision');
    expect(location.pathname).toBe('/treinos/demo-primary-thu/editar');
  });
  it('commits ordered multi-exercise parameters atomically and returns to the selected day', async () => {
    const view = setup(); openPrimary('Qui, com treino');
    const saved = view.state().workouts['demo-primary-thu']!;
    fireEvent.click(screen.getByRole('button', { name: 'Próximo exercício' })); change('Duração (s)', '90');
    fireEvent.click(screen.getByRole('button', { name: 'Opções do exercício' })); fireEvent.click(screen.getByRole('button', { name: 'Mover para cima' }));
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Nome do treino' })).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Salvar treino' }));
    await waitFor(() => expect(location.pathname).toBe('/rotinas'));
    const current = view.state().workouts[saved.id]!;
    expect(current.revision).toBe(2); expect(current.exercises[0]).toMatchObject({ id: saved.exercises[1]!.id, durationSeconds: 90 });
    expect(current.exercises[1]!.id).toBe(saved.exercises[0]!.id);
    expect(saved.exercises[0]!.id).not.toBe(current.exercises[0]!.id);
    expect(selectHomeTraining(view.state())).toMatchObject({ status: 'ready', workout: current, revision: 2 });
    expect(view.state().selectedDayByRoutine['demo-routine']).toBe('thu');
  });
});
