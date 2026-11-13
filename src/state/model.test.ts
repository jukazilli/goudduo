import { createDemoState, demoReducer, selectWorkoutForDay } from './model';
import { describe, expect, it } from 'vitest';
describe('shared demo domain', () => {
  it('creates isolated deterministic scenarios without capabilities or personal information', () => {
    expect(createDemoState()).toEqual(createDemoState());
    expect(createDemoState()).not.toBe(createDemoState());
    expect(createDemoState().user.professional).toBe('not_requested');
  });
  it('atomically updates the workout consumed by routine and Home selectors without mutating the source', () => {
    const before = createDemoState();
    const draft = { ...before.workouts['demo-workout']!, name: 'Revisão sintética', revision: 2 };
    const after = demoReducer(before, { type: 'workout/commit', routineId: 'demo-routine', day: 'mon', workout: draft });
    expect(selectWorkoutForDay(after, 'demo-routine', 'tue')).toBeUndefined();
    expect(selectWorkoutForDay(after, 'demo-routine', 'mon')).toBe(after.workouts['demo-workout']);
    expect(after.workouts['demo-workout']?.exercises).not.toBe(draft.exercises);
    expect(after.workouts['demo-workout']?.name).toBe('Revisão sintética');
    expect(before.workouts['demo-workout']?.revision).toBe(1);
    expect(before.routines['demo-routine']?.days.tue).toBeUndefined();
  });
  it('rejects stale, duplicate or invalid draft commits without changing any collection', () => {
    const state = createDemoState(), workout = state.workouts['demo-workout']!;
    const action = { type: 'workout/commit' as const, routineId: 'demo-routine', day: 'mon' as const, workout };
    expect(demoReducer(state, action)).toBe(state);
    const item = { id: 'item-1', exerciseId: 'demo-exercise', sets: 3, repsMin: 10, repsMax: 8, restSeconds: 60, equipmentId: null };
    expect(demoReducer(state, { ...action, workout: { ...workout, revision: 2, exercises: [item] } })).toBe(state);
    expect(demoReducer(state, { ...action, workout: { ...workout, revision: 2, exercises: [{ ...item, repsMax: 12 }, { ...item, id: 'item-2', repsMax: 12 }] } })).toBe(state);
  });
  it('keeps social state by entity ID and resets only on an explicit scenario action', () => {
    const before = createDemoState();
    const toggled = demoReducer(before, { type: 'social/toggle', collection: 'saved', id: 'synthetic-post' });
    const named = demoReducer(toggled, { type: 'user/name', name: 'Outra pessoa de teste' });
    expect(named.social.saved['synthetic-post']).toBe(true);
    expect(demoReducer(named, { type: 'scenario/reset' })).toEqual(before);
  });
});
