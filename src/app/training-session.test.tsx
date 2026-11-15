import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { BrowserNavigation } from './navigation';
import { NavigationProvider } from './NavigationProvider';
import { DemoProvider, useDemoState } from '../state/DemoProvider';
import { useTrainingSession } from './useTrainingSession';
let navigation: BrowserNavigation;
afterEach(() => { navigation?.dispose(); vi.useRealTimers(); });
function setup() {
  history.replaceState(null, '', '/home/treinos'); navigation = new BrowserNavigation(window);
  return function Wrapper({ children }: { children: ReactNode }) { return <DemoProvider><NavigationProvider navigation={navigation}>{children}</NavigationProvider></DemoProvider>; };
}
describe('session adapter lifecycle and deterministic UI clock', () => {
  it('acknowledges a single real creation, expires rest by deadline, cleans the interval and preserves the session on internal navigation', () => {
    vi.useFakeTimers(); vi.setSystemTime(1000);
    const { result, unmount } = renderHook(() => ({ adapter: useTrainingSession(), state: useDemoState() }), { wrapper: setup() });
    act(() => { result.current.adapter.begin('demo-routine', 'thu'); result.current.adapter.begin('demo-routine', 'thu'); });
    expect(Object.keys(result.current.state.trainingSessions)).toHaveLength(1);
    const value = result.current.adapter.session!, item = value.exercises[value.activeExerciseId]!;
    expect(value.status).toBe('running'); expect(vi.getTimerCount()).toBe(1);
    act(() => result.current.adapter.send({ type: 'session/record', exerciseId: item.id, setId: item.sets[0]!.id }));
    expect(result.current.adapter.session!.status).toBe('resting'); expect(vi.getTimerCount()).toBe(1);
    act(() => vi.advanceTimersByTime(60000)); expect(result.current.adapter.session!.status).toBe('running');
    act(() => navigation.navigate({ page: { destination: 'rotinas' }, panel: null }));
    expect(result.current.state.trainingSessions[value.id]!.status).toBe('paused'); expect(vi.getTimerCount()).toBe(0);
    act(() => result.current.adapter.begin('demo-routine', 'thu'));
    expect(result.current.adapter.session!.id).toBe(value.id); expect(vi.getTimerCount()).toBe(1);
    unmount(); expect(vi.getTimerCount()).toBe(0);
  });
  it('does not create on render or direct route, and conflicting entry never overwrites the active session', () => {
    const { result } = renderHook(() => ({ adapter: useTrainingSession(), state: useDemoState() }), { wrapper: setup() });
    expect(result.current.state.trainingSessions).toEqual({});
    act(() => result.current.adapter.begin('demo-routine', 'mon')); const id = result.current.adapter.session!.id;
    act(() => result.current.adapter.leave());
    act(() => result.current.adapter.begin('demo-routine', 'thu'));
    expect(navigation.getSnapshot().location.panel).toBe('session-conflict'); expect(Object.keys(result.current.state.trainingSessions)).toEqual([id]);
    expect(result.current.state.trainingSessions[id]!.status).toBe('paused');
    act(() => navigation.navigate({ page: { destination: 'session', sessionId: 'missing' }, panel: null }));
    expect(result.current.adapter.session).toBeUndefined(); expect(result.current.state.activeTrainingSessionId).toBe(id);
  });
});
