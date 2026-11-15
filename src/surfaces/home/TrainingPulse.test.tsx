import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { PrototypeApp } from '../../app/PrototypeApp';
import { NavigationProvider } from '../../app/NavigationProvider';
import { BrowserNavigation } from '../../app/navigation';
import { DemoProvider, useDemoDispatch, useDemoState } from '../../state/DemoProvider';
import type { DemoAction, DemoState } from '../../state/model';
import { TrainingPulseStrip } from './TrainingPulse';
import { pulseInitial, pulseRing, trainingPulseIdentities, type DemonstrationPulseIdentity } from './pulse-presentation';
const user = { id: 'synthetic-user', displayName: 'Álfa demonstrativa', professional: 'not_requested' } as const;
const examples: DemonstrationPulseIdentity[] = [
  { id: 'test-seen', displayName: 'Identidade vista — demonstração', viewState: 'seen', scope: 'demonstration' },
  { id: 'test-unseen', displayName: 'Identidade não vista — demonstração', viewState: 'unseen', scope: 'demonstration' },
  { id: 'test-unknown', displayName: 'Identidade neutra — demonstração', viewState: 'unknown', scope: 'demonstration' },
];
let navigation: BrowserNavigation;
afterEach(() => navigation?.dispose());
function setup() {
  history.replaceState(null, '', '/home/treinos'); navigation = new BrowserNavigation(window);
  let state: DemoState, dispatch: (action: DemoAction) => void;
  function Probe() { state = useDemoState(); dispatch = useDemoDispatch(); return <PrototypeApp/>; }
  render(<DemoProvider><NavigationProvider navigation={navigation}><Probe/></NavigationProvider></DemoProvider>);
  return { state: () => state!, dispatch: (action: DemoAction) => act(() => dispatch!(action)) };
}
describe('Pulse presentation identity, no content service', () => {
  it('derives the own initial without a fixed J, preserving accented and Unicode identities', () => {
    expect(pulseInitial('  álfa')).toBe('Á'); expect(pulseInitial('a\u0301lfa')).toBe('Á'); expect(pulseInitial('🙂 demonstração')).toBe('🙂'); expect(pulseInitial('')).toBe('?');
    const items = trainingPulseIdentities(user);
    expect(items.map(item => item.kind)).toEqual(['own', 'institutional']); expect(items[0]!.displayName).toBe(user.displayName);
    expect(items.every(item => item.viewState === 'unknown')).toBe(true);
    expect(items.some(item => 'count' in item || 'media' in item || 'content' in item)).toBe(false);
  });
  it('keeps own/institutional first, deduplicates IDs and accepts only explicit demonstration identities', () => {
    const items = trainingPulseIdentities(user, [...examples, examples[0]!, { ...examples[0]!, id: 'own:synthetic-user' }, { ...examples[0]!, id: '' }, { ...examples[0]!, id: 'empty-name', displayName: '' }]);
    expect(items.map(item => item.id)).toEqual(['own:synthetic-user', 'institutional:goudduo', 'test-seen', 'test-unseen', 'test-unknown']);
    expect(trainingPulseIdentities(user)).toHaveLength(2); expect(examples).toHaveLength(3);
  });
  it('uses canonical ice for seen and keeps unapproved unseen gradient stops out of the renderer', () => {
    expect(pulseRing('seen')).toBe('ice'); expect(pulseRing('unknown')).toBe('neutral'); expect(pulseRing('unseen')).toBe('neutral');
    render(<TrainingPulseStrip items={trainingPulseIdentities(user, examples)}/>);
    expect(document.querySelector('[data-pulse-id=test-seen]')).toHaveAttribute('data-ring', 'ice');
    expect(screen.getByRole('img', { name: /não visto, estado demonstrativo; gradiente pendente/ })).toBeInTheDocument();
    expect(document.querySelector('[data-pulse-id=test-unseen]')).toHaveAttribute('data-ring', 'neutral');
  });
  it('represents zero/one identities without fake counters, media or focusable empty controls', () => {
    const view = render(<TrainingPulseStrip items={[]}/>);
    expect(screen.getByRole('list')).not.toHaveAttribute('tabindex'); expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    view.rerender(<TrainingPulseStrip items={trainingPulseIdentities(user).slice(0, 1)}/>);
    expect(screen.getAllByRole('listitem')).toHaveLength(1); expect(screen.getByRole('button')).toBeDisabled();
    expect(document.querySelector('[data-count],video,input[type=file]')).toBeNull();
  });
});
describe('common-app Pulse uses the existing shared context', () => {
  it('renders only available identities in order with official wordmark and creation disabled', () => {
    setup(); const list = screen.getByRole('list', { name: 'Pulse da Home Treinos' });
    const rows = within(list).getAllByRole('listitem'); expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveAttribute('data-pulse-id', 'own:demo-user'); expect(rows[1]).toHaveAttribute('data-kind', 'institutional');
    expect(within(rows[0]!).getByRole('button')).toHaveAccessibleName('Criar Pulse de Pessoa demonstrativa — indisponível');
    expect(rows[0]).toHaveTextContent('P'); expect(rows[0]).not.toHaveTextContent('J');
    expect(rows[1]!.querySelector('img')?.getAttribute('src')).toContain('goudduo-wordmark-white.svg');
    expect(within(rows[1]!).queryByRole('button')).not.toBeInTheDocument(); expect(document.querySelectorAll('[data-pulse-shape]')).toHaveLength(1);
  });
  it('reacts to shared user identity without changing social/workout/draft entities', () => {
    const view = setup(), original = view.state();
    view.dispatch({ type: 'user/name', name: 'Épsilon demonstrativa' });
    expect(screen.getByRole('button', { name: 'Criar Pulse de Épsilon demonstrativa — indisponível' })).toHaveTextContent('É');
    expect(view.state().social).toBe(original.social); expect(view.state().workouts).toBe(original.workouts); expect(view.state().drafts).toBe(original.drafts);
  });
  it('does not navigate, open viewer/composer or mark seen on touches', () => {
    const view = setup(), original = view.state(), location = navigation.getSnapshot();
    fireEvent.click(screen.getByRole('button', { name: /Criar Pulse de/ }));
    fireEvent.click(screen.getByRole('img', { name: 'goudduo — sem conteúdo Pulse disponível' }));
    expect(navigation.getSnapshot()).toBe(location); expect(view.state()).toBe(original); expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.querySelectorAll('[data-view-state=unknown]')).toHaveLength(2);
  });
  it('preserves existing Publicações/Business without adding a circular implementation or changing the Shell', () => {
    const view = setup(), original = view.state();
    fireEvent.click(screen.getByRole('tab', { name: 'Publicações' }));
    expect(screen.queryByRole('list', { name: 'Pulse da Home Treinos' })).not.toBeInTheDocument(); expect(document.querySelector('[data-pulse-shape]')).toBeNull();
    fireEvent.click(screen.getByRole('tab', { name: 'Business' })); expect(document.querySelector('[data-pulse-shape]')).toBeNull();
    fireEvent.click(screen.getByRole('tab', { name: 'Treinos' })); expect(screen.getAllByRole('listitem')).toHaveLength(2); expect(view.state()).toBe(original);
    expect(within(screen.getByRole('navigation', { name: 'Navegação principal' })).getAllByRole('link')).toHaveLength(5);
  });
  it('keeps scroll-only presentation memory across remounts without adding it to the domain', () => {
    const memory = { current: 25 }, items = trainingPulseIdentities(user, examples);
    const view = render(<TrainingPulseStrip items={items} scrollMemory={memory}/>), row = screen.getByRole('list');
    expect(row.scrollLeft).toBe(25); row.scrollLeft = 50; fireEvent.scroll(row); expect(memory.current).toBe(50);
    view.unmount(); render(<TrainingPulseStrip items={items} scrollMemory={memory}/>); expect(screen.getByRole('list').scrollLeft).toBe(50);
    expect(items.every(item => item.viewState !== undefined)).toBe(true);
  });
});
