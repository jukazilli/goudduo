import { act, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { ReactNode } from 'react';
import { BrowserNavigation } from './navigation';
import { NavigationProvider } from './NavigationProvider';
import { DemoProvider, useDemoDispatch, useDemoState } from '../state/DemoProvider';
import { useRoutineEditorAdapter } from './useRoutineEditorAdapter';
import { RoutineAdapterScenario } from '../lab/RoutineAdapterScenario';
import type { RoutineEditorContext } from './routine-context';

let navigation: BrowserNavigation;
afterEach(() => navigation?.dispose());
function setup(path = '/rotinas') {
  history.replaceState(null, '', path); navigation = new BrowserNavigation(window);
  return function Wrapper({ children }: { children: ReactNode }) {
    return <DemoProvider><NavigationProvider navigation={navigation}>{children}</NavigationProvider></DemoProvider>;
  };
}
const input = { routineId: 'demo-routine', day: 'mon' as const, workoutId: 'demo-workout', draftId: 'draft-a' };
function hook() {
  return renderHook(() => ({ adapter: useRoutineEditorAdapter(), state: useDemoState(), dispatch: useDemoDispatch() }), { wrapper: setup() }).result;
}
describe('routine navigation context', () => {
  it('keeps only markers in history, IDs in routes and ephemeral context through panel back/forward', async () => {
    setup(); navigation.saveScroll(290);
    const context: RoutineEditorContext = { ...input, baseRevision: 1, origin: { page: { destination: 'rotinas' }, scroll: 290 } };
    navigation.navigate({ page: { destination: 'editor', workoutId: input.workoutId }, panel: null }, false, { routineContext: context });
    navigation.saveScroll(150); navigation.openPanel('routine-library');
    expect(navigation.getSnapshot().routineContext).toEqual(context);
    expect(navigation.scrollPosition()).toBe(150);
    expect(Object.keys(history.state).sort()).toEqual(['depth', 'goudduoP1', 'key']);
    expect(location.href).not.toContain('draft-a'); expect(location.href).not.toContain('routineId');
    navigation.closePanel();
    await waitFor(() => expect(navigation.getSnapshot().location.panel).toBeNull());
    expect(navigation.getSnapshot().routineContext).toEqual(context);
    history.forward(); await waitFor(() => expect(navigation.getSnapshot().location.panel).toBe('routine-library'));
    expect(navigation.getSnapshot().routineContext).toEqual(context);
    navigation.dispose(); navigation = new BrowserNavigation(window);
    expect(navigation.getSnapshot().routineContext).toBeUndefined(); // reload boundary
    expect(navigation.getSnapshot().location.page.destination).toBe('editor');
  });
  it('distinguishes two Editors of the same workout without putting drafts in history', () => {
    setup();
    const context: RoutineEditorContext = { ...input, baseRevision: 1, origin: { page: { destination: 'rotinas' }, scroll: 0 } };
    const page = { destination: 'editor' as const, workoutId: input.workoutId };
    navigation.navigate({ page, panel: null }, false, { routineContext: context });
    const first = navigation.getSnapshot().key;
    navigation.navigate({ page, panel: null }, false, { routineContext: { ...context, draftId: 'second' } });
    expect(navigation.getSnapshot().key).not.toBe(first);
    expect(navigation.getSnapshot().routineContext!.draftId).toBe('second');
  });
});
describe('Editor adapter and domain gates', () => {
  it('does not provide a save action for direct placeholder routes without context', () => {
    const { result } = renderHook(useRoutineEditorAdapter, { wrapper: setup('/treinos/demo-workout/editar') });
    expect(result.current.status).toBe('context-unavailable'); expect(result.current.header).toBeUndefined();
    expect(result.current.resolveOverlay('routine-naming')).toBeUndefined();
  });
  it('prepares, confirms, validates final name and returns only after a successful reducer commit', async () => {
    const result = hook(); navigation.saveScroll(320);
    act(() => { expect(result.current.adapter.openEditor(input)).toBe(true); });
    const original = result.current.state.workouts;
    expect(result.current.adapter.header!.title).toBe('Treino de demonstração');
    act(() => result.current.adapter.requestSave());
    expect(result.current.state.drafts['draft-a']!.stage).toBe('confirm-single');
    expect(navigation.getSnapshot().location.panel).toBe('routine-confirm-single');
    expect(result.current.state.workouts).toBe(original);
    act(() => result.current.adapter.confirmSingle());
    expect(navigation.getSnapshot().location.panel).toBe('routine-naming');
    act(() => result.current.adapter.submitName('   '));
    expect(result.current.state.workouts).toBe(original);
    expect(result.current.adapter.issue).toBe('name-required');
    act(() => result.current.adapter.submitName('Treino sintético final'));
    expect(result.current.state.workouts['demo-workout']!.revision).toBe(2);
    expect(result.current.state.drafts['draft-a']).toBeUndefined();
    expect(navigation.getSnapshot().location.page.destination).toBe('rotinas');
    expect(navigation.scrollPosition()).toBe(320);
  });
  it('derives the full long title and disables stale header actions without inventing placeholder controls', () => {
    const result = hook();
    const workout = result.current.state.workouts['demo-workout']!;
    const name = 'Título contextual longo '.repeat(4);
    act(() => result.current.dispatch({ type: 'workout/commit', routineId: 'demo-routine', day: 'mon', workout: { ...workout, name, revision: 2 } }));
    act(() => { result.current.adapter.openEditor(input); });
    expect(result.current.adapter.header!.title).toBe(name.trim());
    expect(result.current.adapter.header!.action!.disabled).toBe(false);
  });
  it('keeps draft identity across library, tabs, Back and Forward without saving or implicit discard', async () => {
    const result = hook();
    act(() => { result.current.adapter.openEditor(input); });
    const draft = result.current.state.drafts['draft-a'];
    act(() => result.current.adapter.openLibrary());
    act(() => navigation.closePanel()); await waitFor(() => expect(navigation.getSnapshot().location.panel).toBeNull());
    expect(result.current.state.drafts['draft-a']).toBe(draft);
    act(() => navigation.back()); await waitFor(() => expect(navigation.getSnapshot().location.page.destination).toBe('rotinas'));
    expect(result.current.state.drafts['draft-a']).toBe(draft);
    act(() => { result.current.adapter.openEditor({ ...input, draftId: 'draft-b' }); });
    expect(Object.keys(result.current.state.drafts)).toHaveLength(2);
    act(() => { result.current.adapter.cancelEditing(false); }); expect(Object.keys(result.current.state.drafts)).toHaveLength(2);
    act(() => { result.current.adapter.cancelEditing(true); }); expect(Object.keys(result.current.state.drafts)).toEqual(['draft-a']);
    expect(result.current.state.workouts['demo-workout']!.revision).toBe(1);
  });
  it('disables empty/stale prescriptions without changing the conservative domain rule', () => {
    const result = hook(); act(() => { result.current.adapter.openEditor(input); });
    act(() => result.current.dispatch({ type: 'draft/replace-exercises', draftId: 'draft-a', exercises: [] }));
    expect(result.current.adapter.header!.action!.disabled).toBe(true);
    act(() => result.current.adapter.requestSave()); expect(result.current.adapter.issue).toBe('empty');
    expect(navigation.getSnapshot().location.panel).toBeNull();
    const workout = result.current.state.workouts['demo-workout']!;
    act(() => result.current.dispatch({ type: 'workout/commit', routineId: 'demo-routine', day: 'mon', workout: { ...workout, name: 'Concurrent rename', revision: 2 } }));
    expect(result.current.adapter.issue).toBe('stale-revision'); expect(result.current.adapter.header!.action!.disabled).toBe(true);
    expect(result.current.state.workouts['demo-workout']!.revision).toBe(2);
  });
});
describe('shared chrome and contextual host consumer', () => {
  it('renders only one contextual header, preserves long title, focuses Library and keeps content through exit', async () => {
    const wrapper = setup(); const view = render(<RoutineAdapterScenario/>, { wrapper });
    fireEvent.click(screen.getByRole('button', { name: 'Abrir Editor técnico' }));
    expect(document.querySelectorAll('[data-header="editor"]')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Voltar' }).querySelector('.lucide-chevron-left')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Abrir Biblioteca técnica' }));
    expect(screen.getByRole('dialog')).toHaveAttribute('data-overlay-size', 'library');
    expect(screen.getByLabelText('Campo técnico de foco')).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(location.search).toBe(''));
    expect(screen.getByRole('dialog')).toBeInTheDocument(); // exit has not unmounted prematurely
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe('');
    expect(screen.getByTestId('technical-count')).toHaveTextContent('1');
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Confirmar exercício técnico único' }));
    expect(await screen.findByLabelText('Nome técnico final')).toHaveValue('Treino de segunda-feira');
    fireEvent.click(screen.getByRole('button', { name: 'Continuar edição técnica' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(screen.getByTestId('technical-stage')).toHaveTextContent('editing');
    expect(screen.getByTestId('technical-revision')).toHaveTextContent('1'); view.unmount();
  });
});
