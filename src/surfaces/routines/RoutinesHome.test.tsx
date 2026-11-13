import { act, fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { DemoProvider, useDemoDispatch, useDemoState } from '../../state/DemoProvider';
import { NavigationProvider } from '../../app/NavigationProvider';
import { BrowserNavigation } from '../../app/navigation';
import { PrototypeApp } from '../../app/PrototypeApp';
import { routinesLayout } from './layout';
import type { DemoAction, DemoState } from '../../state/model';
let navigation: BrowserNavigation;
afterEach(() => navigation?.dispose());
function setup() {
  history.replaceState(null, '', '/rotinas'); navigation = new BrowserNavigation(window);
  let state: DemoState, dispatch: (action: DemoAction) => void;
  function Probe() { state = useDemoState(); dispatch = useDemoDispatch(); return <PrototypeApp/>; }
  const view = render(<DemoProvider><NavigationProvider navigation={navigation}><Probe/></NavigationProvider></DemoProvider>);
  return { ...view, state: () => state!, dispatch: (action: DemoAction) => act(() => dispatch!(action)) };
}
describe('V7.4 temporary layout', () => {
  it('swaps only the right secondary with its left neighbour, without mutating input', () => {
    const ids = ['primary', 'a', 'b', 'c', 'd'];
    expect(routinesLayout(ids, 'primary', 'b')).toEqual({ primaryId: 'primary', ids: ['primary', 'b', 'a', 'c', 'd'], orphanId: 'd' });
    expect(routinesLayout(ids, 'primary', null).ids).toEqual(ids);
    expect(ids).toEqual(['primary', 'a', 'b', 'c', 'd']);
    expect(routinesLayout(ids, 'primary', 'c').ids).toEqual(ids);
    expect(routinesLayout([], null, null).ids).toEqual([]);
  });
  it('expands the actual orphan regardless of the hero or expanded item', () => {
    expect(routinesLayout(['p', 'a', 'b', 'c'], 'p', null).orphanId).toBe('c');
    expect(routinesLayout(['p', 'a', 'b', 'c'], 'p', 'b').orphanId).toBeNull();
    expect(routinesLayout(['p', 'a'], 'p', null).orphanId).toBe('a');
  });
});
describe('integrated Routines Home', () => {
  it('renders principal/secondaries from one store and restores order after in-place expansion', () => {
    const view = setup(), routines = view.state().routines;
    const ids = () => [...document.querySelectorAll('[data-routine-id]')].map(node => node.getAttribute('data-routine-id'));
    const original = ids(); expect(original).toHaveLength(5); expect(screen.getByText('PRINCIPAL')).toBeInTheDocument();
    const toggle = screen.getByRole('button', { name: 'Expandir Em casa · demo' }); fireEvent.click(toggle);
    expect(ids()).toEqual(['demo-routine', 'demo-home', 'demo-alternative', 'demo-run', 'demo-mobility']);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle.getAttribute('aria-controls')).toBe('routine-preview-demo-home');
    expect(view.state().routines).toBe(routines);
    fireEvent.click(screen.getByRole('button', { name: 'Recolher Em casa · demo' })); expect(ids()).toEqual(original);
    expect(view.state().routines).toBe(routines);
  });
  it('selects days per routine, derives single/multiple prescriptions and preserves saved identity', () => {
    const view = setup(); fireEvent.click(screen.getByRole('button', { name: 'Expandir Rotina de demonstração' }));
    const region = screen.getByRole('region', { name: 'Treinos de Rotina de demonstração' });
    expect(within(region).getByText('1 EXERCÍCIO', { exact: false })).toBeInTheDocument();
    const workout = view.state().workouts['demo-workout'];
    fireEvent.click(within(region).getByRole('tab', { name: 'Qui, com treino' }));
    expect(view.state().selectedDayByRoutine['demo-routine']).toBe('thu');
    expect(within(region).getByText('QUI · 2 EXERCÍCIOS')).toBeInTheDocument();
    fireEvent.click(within(region).getByRole('tab', { name: 'Dom, dia livre' }));
    expect(within(region).getByRole('heading', { name: 'Sem treino' })).toBeInTheDocument();
    expect(view.state().workouts['demo-workout']).toBe(workout);
    expect(view.state().selectedDayByRoutine['demo-home']).toBeUndefined();
    fireEvent.click(screen.getByRole('button', { name: 'Expandir Alternativa demo' }));
    expect(screen.getByText('SEG · 3 EXERCÍCIOS')).toBeInTheDocument(); expect(screen.getByText('+ 1 exercício')).toBeInTheDocument();
  });
  it('supports keyboard days, explicit empty routine/scenario and honest unavailable operations', () => {
    const view = setup(); fireEvent.click(screen.getByRole('button', { name: 'Expandir Mobilidade demo' }));
    const region = screen.getByRole('region', { name: 'Treinos de Mobilidade demo' });
    fireEvent.keyDown(within(region).getByRole('tablist'), { key: 'End' });
    expect(within(region).getByRole('tab', { name: 'Dom, dia livre' })).toHaveAttribute('aria-selected', 'true');
    expect(within(region).getByRole('heading', { name: 'Sem treino' })).toBeInTheDocument();
    view.dispatch({ type: 'scenario/routines', scenario: 'one' }); expect(document.querySelectorAll('[data-routine-id]')).toHaveLength(1);
    view.dispatch({ type: 'scenario/routines', scenario: 'none' }); expect(screen.getByRole('heading', { name: 'Suas rotinas começam aqui' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Criar rotina' })).toBeDisabled();
  });
  it('reflects a saved change without stale preview copies', () => {
    const view = setup(); fireEvent.click(screen.getByRole('button', { name: 'Expandir Rotina de demonstração' }));
    const saved = view.state().workouts['demo-workout']!;
    view.dispatch({ type: 'workout/commit', routineId: 'demo-routine', day: 'mon', workout: { ...saved, name: 'Revisão compartilhada', revision: 2 } });
    expect(screen.getByRole('heading', { name: 'Revisão compartilhada' })).toBeInTheDocument();
    expect(view.state().workouts['demo-workout']!.exercises[0]!.id).toBe(saved.exercises[0]!.id);
  });
  it('does not fabricate a saved prescription when opening a free day', () => {
    const view = setup(); fireEvent.click(screen.getByRole('button', { name: 'Expandir Rotina de demonstração' }));
    const region = screen.getByRole('region', { name: 'Treinos de Rotina de demonstração' });
    fireEvent.click(within(region).getByRole('tab', { name: 'Dom, dia livre' }));
    const saved = view.state().workouts;
    fireEvent.click(within(region).getByRole('button', { name: 'Adicionar treino' }));
    expect(view.state().workouts).toBe(saved); expect(view.state().routines['demo-routine']!.days.sun).toBeUndefined();
    const draft = Object.values(view.state().drafts)[0]!; expect(draft.exercises).toEqual([]); expect(draft.baseRevision).toBe(0);
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();
  });
  it('opens the real Editor, reuses its draft on return, and never commits by navigation', async () => {
    const view = setup(); fireEvent.click(screen.getByRole('button', { name: 'Expandir Rotina de demonstração' }));
    const saved = view.state().workouts; fireEvent.click(screen.getByRole('button', { name: 'Ver treino' }));
    expect(location.pathname).toBe('/treinos/demo-workout/editar'); expect(screen.getByRole('button', { name: 'Salvar' })).toBeEnabled();
    expect(screen.getByRole('region', { name: 'Editor de treino' })).toBeInTheDocument();
    const draft = Object.values(view.state().drafts)[0]!;
    act(() => navigation.back()); await waitFor(() => expect(location.pathname).toBe('/rotinas'));
    expect(screen.getByRole('button', { name: 'Recolher Rotina de demonstração' })).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Ver treino' })); expect(Object.keys(view.state().drafts)).toEqual([draft.id]); expect(view.state().workouts).toBe(saved);
  });
});
