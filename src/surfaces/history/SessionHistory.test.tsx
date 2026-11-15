import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as demoHooks from '../../state/DemoProvider';
import { DemoProvider } from '../../state/DemoProvider';
import { createDemoState, demoReducer, type DemoState } from '../../state/model';
import { NavigationProvider } from '../../app/NavigationProvider';
import { BrowserNavigation } from '../../app/navigation';
import { PrototypeApp } from '../../app/PrototypeApp';
let navigation: BrowserNavigation, restore: (() => void) | undefined, unmount: (() => void) | undefined;
afterEach(() => { unmount?.(); restore?.(); navigation?.dispose(); restore = undefined; unmount = undefined; });
function finished() {
  let state = createDemoState();
  state = demoReducer(state, { type: 'session/create', sessionId: 'owned', routineId: 'demo-routine', day: 'mon', now: 1000, origin: { destination: 'home', scroll: 0 } });
  state = demoReducer(state, { type: 'session/start', sessionId: 'owned', now: 1000 });
  const item = state.trainingSessions.owned!.exercises[state.trainingSessions.owned!.activeExerciseId]!;
  state = demoReducer(state, { type: 'session/input', sessionId: 'owned', exerciseId: item.id, setId: item.sets[0]!.id, values: { repetitions: 9, loadKg: 7.5 }, now: 1500 });
  state = demoReducer(state, { type: 'session/record', sessionId: 'owned', exerciseId: item.id, setId: item.sets[0]!.id, now: 2000 });
  return demoReducer(state, { type: 'session/finish', sessionId: 'owned', now: 3000, confirmed: true });
}
function setup(state: DemoState, path = '/historico') {
  history.replaceState(null, '', path); navigation = new BrowserNavigation(window);
  const original = demoHooks.useDemoState;
  const spy = vi.spyOn(demoHooks, 'useDemoState').mockImplementation(() => { original(); return state; }); restore = () => spy.mockRestore();
  const view = render(<DemoProvider><NavigationProvider navigation={navigation}><PrototypeApp/></NavigationProvider></DemoProvider>); unmount = view.unmount;
}
describe('integrated read-only History surfaces', () => {
  it('shows an honest empty memory with one shared header and no extra TabBar', () => {
    setup(createDemoState()); expect(screen.getByRole('heading', { name: 'Nenhuma sessão finalizada' })).toBeInTheDocument();
    expect(screen.getAllByRole('banner')).toHaveLength(1); expect(screen.queryByRole('navigation', { name: 'Navegação principal' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Abrir resultado/ })).not.toBeInTheDocument();
  });
  it('opens actual versus prescribed values and returns with selected item/focus, without altering the source', async () => {
    const state = finished(), before = state.trainingSessions; setup(state);
    const link = screen.getByRole('link', { name: 'Abrir resultado de Treino de demonstração' }); expect(link).toHaveAccessibleDescription(/Finalizada.*Todas as séries registradas/); fireEvent.click(link);
    expect(screen.getByRole('heading', { name: 'Resultado da sessão' })).toBeInTheDocument();
    const result = screen.getByRole('region', { name: 'Resultado da sessão' });
    expect(within(result).getByText(/1–1 repetições/)).toBeInTheDocument(); expect(within(result).getByText('Série 1: 9 repetições · 7.5 kg')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument(); expect(screen.queryByRole('button', { name: /Salvar/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Voltar' }));
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Histórico' })).toBeInTheDocument());
    expect(screen.getByRole('link', { name: 'Abrir resultado de Treino de demonstração' })).toHaveAttribute('aria-current', 'true');
    expect(state.trainingSessions).toBe(before);
  });
  it.each(['/historico/foreign', '/sessao/foreign'])('never exposes another owner through direct %s', path => {
    const state = finished(), foreign = { ...state.trainingSessions.owned!, id: 'foreign', userId: 'another-user', workoutName: 'Private synthetic fixture' };
    setup({ ...state, trainingSessions: { ...state.trainingSessions, foreign } }, path);
    expect(screen.queryByText('Private synthetic fixture')).not.toBeInTheDocument(); expect(screen.queryByText('Série 1: 9 repetições · 7.5 kg')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Ver resultado' })).not.toBeInTheDocument();
  });
  it('shows unavailable ID safely and round-trips only opaque identifiers', () => {
    setup(finished(), '/historico/missing'); expect(screen.getByRole('heading', { name: 'Resultado indisponível' })).toBeInTheDocument();
    expect(screen.queryByText('Treino de demonstração')).not.toBeInTheDocument(); expect(screen.getByRole('link', { name: 'Histórico' })).toHaveAttribute('href', '/historico');
  });
});
