import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { PrototypeApp } from '../../app/PrototypeApp';
import { NavigationProvider } from '../../app/NavigationProvider';
import { BrowserNavigation } from '../../app/navigation';
import { DemoProvider, useDemoDispatch, useDemoState } from '../../state/DemoProvider';
import { createDemoState, type DemoAction, type DemoState } from '../../state/model';
import { selectHomeTraining } from '../../state/selectors';
import { homeBentoLayout, homeOrder } from './layout';
import { selectHeroChoices } from './training-data';
let navigation: BrowserNavigation;
afterEach(() => navigation?.dispose());
function setup() {
  history.replaceState(null, '', '/home/treinos'); navigation = new BrowserNavigation(window);
  let state: DemoState, dispatch: (action: DemoAction) => void;
  function Probe() { state = useDemoState(); dispatch = useDemoDispatch(); return <PrototypeApp/>; }
  render(<DemoProvider><NavigationProvider navigation={navigation}><Probe/></NavigationProvider></DemoProvider>);
  return { state: () => state!, dispatch: (action: DemoAction) => act(() => dispatch!(action)) };
}
const ids = () => [...document.querySelectorAll('[data-home-card]')].map(node => node.getAttribute('data-home-card'));
const hero = () => document.querySelector<HTMLElement>('.home-training-v53__hero')!;
describe('V5.3 grouped layout', () => {
  it('expands a top card first, keeps Hero boundary and restores the canonical order', () => {
    expect(homeBentoLayout('status').ids).toEqual(['status', 'ranking', 'weight', 'workout', 'measures', 'library', 'photos', 'records', 'consistency']);
    expect(homeBentoLayout('weight').mode).toBe('top');
    expect(homeBentoLayout(null).ids).toEqual(homeOrder);
  });
  it('keeps upper cluster and Hero when a lower card expands, filling the final orphan', () => {
    expect(homeBentoLayout('photos')).toMatchObject({ ids: ['ranking', 'status', 'weight', 'workout', 'photos', 'measures', 'library', 'records', 'consistency'], mode: 'lower', orphan: 'records' });
    expect(homeBentoLayout('records').orphan).toBe('photos');
    expect(homeBentoLayout('consistency')).toMatchObject({ ids: homeOrder, orphan: null });
  });
});
describe('Hero uses authoritative prescriptions', () => {
  it('derives only distinct, valid, primary-routine workouts, with no fabricated third entry', () => {
    const state = createDemoState(), list = selectHeroChoices(state);
    expect(list.map(item => item.day)).toEqual(['mon', 'thu']); expect(list[0]!.workout).toBe(state.workouts['demo-workout']);
    expect(selectHeroChoices({ ...state, primaryRoutineId: null })).toEqual([]);
    const broken: DemoState = { ...state, workouts: {} }; expect(selectHeroChoices(broken)).toEqual([]);
    const shared: DemoState = { ...state, selectedDayByRoutine: { 'demo-routine': 'tue' }, routines: { ...state.routines, 'demo-routine': { ...state.routines['demo-routine']!, days: { mon: 'demo-workout', tue: 'demo-workout' } } } };
    expect(selectHeroChoices(shared).map(item => item.day)).toEqual(['tue']);
  });
  it('shows the actual entity/revision/count and follows the shared selection', () => {
    const view = setup(); expect(hero()).toHaveAttribute('data-workout-id', 'demo-workout'); expect(hero()).toHaveAttribute('data-revision', '1');
    const saved = view.state().workouts;
    fireEvent.click(screen.getByRole('button', { name: 'Selecionar treino de quinta-feira' }));
    expect(view.state().selectedDayByRoutine['demo-routine']).toBe('thu'); expect(view.state().workouts).toBe(saved);
    expect(hero()).toHaveAttribute('data-workout-id', 'demo-primary-thu'); expect(within(hero()).getByText('2 exercícios')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Ver treino' }));
    expect(navigation.getSnapshot().location.page.destination).toBe('rotinas');
    expect(screen.getByRole('tab', { name: 'Qui, com treino' })).toHaveAttribute('aria-selected', 'true');
  });
  it('reflects committed changes immediately and never exposes an unsaved draft', () => {
    const view = setup(), saved = view.state().workouts['demo-workout']!;
    view.dispatch({ type: 'draft/open', draftId: 'home-edit', routineId: 'demo-routine', day: 'mon', workoutId: saved.id });
    view.dispatch({ type: 'draft/update', draftId: 'home-edit', exercise: { ...saved.exercises[0]!, sets: 5 } });
    expect(hero()).toHaveAttribute('data-revision', '1'); expect(selectHomeTraining(view.state()).workout).toBe(saved);
    view.dispatch({ type: 'draft/prepare', draftId: 'home-edit' });
    view.dispatch({ type: 'draft/confirm-single', draftId: 'home-edit' });
    view.dispatch({ type: 'draft/commit', draftId: 'home-edit', name: 'Treino atualizado na mesma fonte' });
    expect(hero()).toHaveAttribute('data-workout-id', saved.id); expect(hero()).toHaveAttribute('data-revision', '2');
    expect(within(hero()).getByRole('heading')).toHaveTextContent('Treino atualizado na mesma fonte');
    view.dispatch({ type: 'training/unlink', routineId: 'demo-routine', day: 'mon', workoutId: saved.id, revision: 2 });
    expect(within(hero()).getByRole('heading')).toHaveTextContent('Sem treino'); expect(hero()).not.toHaveAttribute('data-workout-id');
  });
  it('preserves empty selected days rather than substituting another valid workout', () => {
    const view = setup(), workouts = view.state().workouts;
    view.dispatch({ type: 'training/select', routineId: 'demo-routine', day: 'sun' });
    expect(screen.getByRole('heading', { name: 'Sem treino' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Organizar treinos' })).toBeInTheDocument(); expect(view.state().workouts).toBe(workouts);
    view.dispatch({ type: 'scenario/routines', scenario: 'none' }); expect(selectHeroChoices(view.state())).toEqual([]);
    expect(hero()).not.toHaveAttribute('data-routine-id');
  });
});
describe('surface boundaries and neutral widgets', () => {
  it('renders the Bento and empty Pulse region under one protected Shell', () => {
    setup(); expect(ids()).toEqual(homeOrder);
    expect(within(screen.getByTestId('training-pulse-slot')).getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Criar Pulse de Pessoa demonstrativa — indisponível' })).toBeDisabled();
    expect(screen.getAllByRole('banner')).toHaveLength(1); expect(within(screen.getByRole('navigation', { name: 'Navegação principal' })).getAllByRole('link')).toHaveLength(5);
    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument(); expect(document.querySelector('input[type=file]')).toBeNull();
    expect(screen.queryByText(/pts|78,4|3 de 4 treinos|Ravi/)).not.toBeInTheDocument();
  });
  it('expands and restores by group, keeps entities unchanged and restores focus on Escape', () => {
    const view = setup(), routines = view.state().routines, workouts = view.state().workouts;
    const toggle = screen.getByRole('button', { name: 'Expandir Status' }); fireEvent.click(toggle);
    expect(ids()[0]).toBe('status'); expect(toggle).toHaveAttribute('aria-expanded', 'true'); expect(screen.getByRole('heading', { name: 'Em construção' })).toBeInTheDocument();
    expect(document.querySelector('a[href*=GODUOIT]')).toBeNull();
    fireEvent.keyDown(toggle, { key: 'Escape' }); expect(ids()).toEqual(homeOrder); expect(toggle).toHaveFocus();
    fireEvent.click(screen.getByRole('button', { name: 'Expandir Fotos' }));
    expect(ids()[4]).toBe('photos'); expect(document.querySelector('[data-home-card=records]')).toHaveClass('is-orphan');
    fireEvent.click(screen.getByRole('button', { name: 'Fechar Fotos' })); expect(ids()).toEqual(homeOrder);
    expect(view.state().routines).toBe(routines); expect(view.state().workouts).toBe(workouts);
  });
  it('keeps expansion and data while isolating Publicações and Business compositions', () => {
    const view = setup(), state = view.state();
    fireEvent.click(screen.getByRole('button', { name: 'Expandir Ranking' }));
    fireEvent.click(screen.getByRole('tab', { name: 'Publicações' })); expect(screen.queryByTestId('home-training')).not.toBeInTheDocument(); expect(document.querySelector('[data-pulse-shape]')).toBeNull();
    fireEvent.click(screen.getByRole('tab', { name: 'Business' })); expect(screen.queryByTestId('home-training')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Treinos' })); expect(screen.getByRole('button', { name: 'Recolher Ranking' })).toHaveAttribute('aria-expanded', 'true');
    expect(view.state()).toBe(state); expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
