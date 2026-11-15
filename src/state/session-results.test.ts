import { describe, expect, it } from 'vitest';
import { createDemoState, demoReducer, type DemoAction, type DemoState } from './model';
import { selectSessionHistory, selectSessionResult } from './session-results';
import type { SessionStatus } from '../domain/session';
const send = (state: DemoState, ...actions: DemoAction[]) => actions.reduce(demoReducer, state);
function completed(state = createDemoState(), id = 'result-a', endedAt = 4000, partial = false, record = true) {
  state = send(state, { type: 'session/create', sessionId: id, routineId: 'demo-routine', day: partial ? 'thu' : 'mon', now: 1000, origin: { destination: 'home', scroll: 0 } }, { type: 'session/start', sessionId: id, now: 1000 });
  const item = state.trainingSessions[id]!.exercises[state.trainingSessions[id]!.activeExerciseId]!;
  if (record) state = send(state, { type: 'session/input', sessionId: id, exerciseId: item.id, setId: item.sets[0]!.id, values: { repetitions: 9, loadKg: 7.5 }, now: 1500 }, { type: 'session/record', sessionId: id, exerciseId: item.id, setId: item.sets[0]!.id, now: 2000 });
  return demoReducer(state, { type: 'session/finish', sessionId: id, now: endedAt, confirmed: true });
}
describe('private in-memory result projections', () => {
  it('starts empty, creates no record from selection or prescribed editing, and has no durable source', () => {
    const state = createDemoState(); expect(selectSessionHistory(state)).toEqual([]);
    const selected = send(state, { type: 'training/select', routineId: 'demo-routine', day: 'thu' }, { type: 'draft/open', draftId: 'edit', routineId: 'demo-routine', day: 'mon', workoutId: 'demo-workout' });
    expect(selectSessionHistory(selected)).toEqual([]); expect(createDemoState().trainingSessions).toEqual({});
  });
  it('preserves session, prescription and owner identity and returns only recorded actual values', () => {
    const state = completed(), before = state.trainingSessions, result = selectSessionResult(state, 'result-a')!;
    expect(result).toMatchObject({ sessionId: 'result-a', userId: 'demo-user', workoutId: 'demo-workout', revision: 1, routineId: 'demo-routine', day: 'mon', workoutName: 'Treino de demonstração', startedAt: 1000, endedAt: 4000, activeMs: 3000, completion: 'complete', recordedSetCount: 1, unrecordedSetCount: 0 });
    expect(result.exercises[0]!.prescribed).toMatchObject({ repsMin: 1, repsMax: 1 });
    expect(result.exercises[0]!.sets[0]!).toMatchObject({ recordedAt: 2000, actual: { repetitions: 9, loadKg: 7.5 } });
    expect(state.trainingSessions).toBe(before); expect(selectSessionHistory(state)[0]).toEqual(result);
  });
  it.each(['prepared','running','resting','paused','discarded'] as const)('excludes %s from completed History and direct Result access', (status: SessionStatus) => {
    const state = completed(), record = state.trainingSessions['result-a']!;
    const variant = { ...state, trainingSessions: { 'result-a': { ...record, status } } };
    expect(selectSessionHistory(variant)).toEqual([]); expect(selectSessionResult(variant, 'result-a')).toBeUndefined();
  });
  it('sorts by endedAt descending, breaks ties by ASCII ID and keeps repeated workouts independent', () => {
    let state = completed(createDemoState(), 'z-session', 5000);
    state = completed(state, 'a-session', 5000); state = completed(state, 'newest', 6000);
    const before = state.trainingSessions;
    expect(selectSessionHistory(state).map(row => row.sessionId)).toEqual(['newest','a-session','z-session']);
    expect(new Set(selectSessionHistory(state).map(row => row.workoutId))).toEqual(new Set(['demo-workout']));
    expect(state.trainingSessions).toBe(before); expect(state.trainingSessions['z-session']!.exercises).not.toBe(state.trainingSessions['a-session']!.exercises);
  });
  it('requires ownership for every read, independent of opaque route ID and object insertion order', () => {
    const state = completed(); const foreign = { ...state.trainingSessions['result-a']!, id: 'foreign', userId: 'other-user', workoutName: 'Private synthetic fixture' };
    const mixed = { ...state, trainingSessions: { foreign, ...state.trainingSessions } };
    expect(selectSessionHistory(mixed).map(row => row.sessionId)).toEqual(['result-a']); expect(selectSessionResult(mixed, 'foreign')).toBeUndefined();
    expect(selectSessionHistory({ ...mixed, user: { ...state.user, id: 'other-user' } }).map(row => row.sessionId)).toEqual(['foreign']);
    expect(selectSessionResult({ ...mixed, user: { ...state.user, id: 'unknown-user' } }, 'result-a')).toBeUndefined();
  });
  it.each(['missing', '', 'bad/id', 'bad%2Fid', 'constructor', '__proto__', 'x'.repeat(81)])('rejects missing/invalid identity %s without fallback', id => {
    expect(selectSessionResult(completed(), id)).toBeUndefined();
  });
  it('refuses mismatched table identity or unusable completion timestamp without leaking title/data', () => {
    const state = completed(), record = state.trainingSessions['result-a']!;
    for (const patch of [{ id: 'different' }, { endedAt: null }, { endedAt: Infinity }, { endedAt: 9000000000000000 }]) {
      expect(selectSessionHistory({ ...state, trainingSessions: { 'result-a': { ...record, ...patch } } })).toEqual([]);
    }
  });
  it('labels a confirmed empty result factually rather than inventing performed work', () => {
    const result = selectSessionResult(completed(createDemoState(), 'empty', 4000, false, false), 'empty')!;
    expect(result).toMatchObject({ completion: 'no-records', recordedSetCount: 0, performedExerciseCount: 0, unrecordedSetCount: 1 });
    expect(result.exercises[0]!.sets[0]!.actual).toBeNull();
  });
  it('keeps skipped partial records, excludes pending defaults and never promotes partial to complete', () => {
    let state = send(createDemoState(), { type: 'session/create', sessionId: 'partial', routineId: 'demo-routine', day: 'thu', now: 1000, origin: { destination: 'rotinas', scroll: 0 } }, { type: 'session/start', sessionId: 'partial', now: 1000 });
    const session = state.trainingSessions.partial!, item = session.exercises[session.order[0]!]!;
    state = send(state, { type: 'session/record', sessionId: session.id, exerciseId: item.id, setId: item.sets[0]!.id, now: 2000 }, { type: 'session/rest-skip', sessionId: session.id, now: 2100 }, { type: 'session/set-select', sessionId: session.id, exerciseId: item.id, setId: item.sets[1]!.id, now: 2200 },
      { type: 'session/input', sessionId: session.id, exerciseId: item.id, setId: item.sets[1]!.id, values: { repetitions: 99 }, now: 2300 }, { type: 'session/skip', sessionId: session.id, exerciseId: item.id, now: 2400 }, { type: 'session/finish', sessionId: session.id, now: 3000, confirmed: true });
    const result = selectSessionResult(state, 'partial')!;
    expect(result).toMatchObject({ completion: 'partial', recordedSetCount: 1, unrecordedSetCount: 2, skippedExerciseCount: 1, performedExerciseCount: 1 });
    expect(result.exercises[0]!.skipped).toBe(true); expect(result.exercises[0]!.sets[0]!.actual?.repetitions).toBe(8); expect(result.exercises[0]!.sets[1]!.actual).toBeNull();
    expect(result.exercises[1]!.sets[0]!.actual).toBeNull();
  });
  it('preserves original name, revision and prescribed/actual values when Editor saves a new version or current catalogue disappears', () => {
    let state = completed(); const original = selectSessionResult(state, 'result-a')!;
    const prescribed = state.workouts['demo-workout']!.exercises[0]!;
    if (prescribed.measurement === 'time' || prescribed.measurement === 'distance') throw new Error('Expected repetitions fixture');
    state = send(state, { type: 'draft/open', draftId: 'edit', routineId: 'demo-routine', day: 'mon', workoutId: 'demo-workout' }, { type: 'draft/update', draftId: 'edit', exercise: { ...prescribed, repsMin: 4, repsMax: 6, loadKg: 20 } }, { type: 'draft/prepare', draftId: 'edit' }, { type: 'draft/confirm-single', draftId: 'edit' }, { type: 'draft/commit', draftId: 'edit', name: 'New saved name' });
    expect(state.workouts['demo-workout']!.revision).toBe(2); expect(selectSessionResult(state, 'result-a')).toEqual(original);
    expect(selectSessionResult({ user: state.user, trainingSessions: state.trainingSessions }, 'result-a')).toEqual(original);
    const second = completed(state, 'result-b', 5000); expect(selectSessionHistory(second).map(row => row.revision)).toEqual([2,1]);
  });
  it('cannot duplicate terminal results, mutate a foreign session, or alter saved data by reading results', () => {
    const state = completed(); const saved = state.workouts;
    const again = send(state, { type: 'session/finish', sessionId: 'result-a', now: 5000, confirmed: true }, { type: 'session/resume', sessionId: 'result-a', now: 5000 });
    expect(again).toBe(state); expect(selectSessionHistory(again)).toHaveLength(1); expect(again.workouts).toBe(saved);
    const foreign: DemoState = { ...state, user: { ...state.user, id: 'other' }, trainingSessions: { 'result-a': { ...state.trainingSessions['result-a']!, status: 'paused', endedAt: null } }, activeTrainingSessionId: 'result-a' };
    expect(demoReducer(foreign, { type: 'session/resume', sessionId: 'result-a', now: 5000 })).toBe(foreign);
  });
  it.each(['time','distance'] as const)('projects %s actual values independently from other measurement modes', measurement => {
    let state = createDemoState(); const routineId = measurement === 'time' ? 'demo-routine' : 'demo-run', day = measurement === 'time' ? 'thu' : 'wed';
    state = send(state, { type: 'session/create', sessionId: 'measured', routineId, day, now: 1000, origin: { destination: 'rotinas', scroll: 0 } }, { type: 'session/start', sessionId: 'measured', now: 1000 });
    const session = state.trainingSessions.measured!, id = measurement === 'time' ? session.order[1]! : session.order[0]!, item = session.exercises[id]!;
    state = send(state, { type: 'session/select', sessionId: session.id, exerciseId: id, now: 1500 }, { type: 'session/input', sessionId: session.id, exerciseId: id, setId: item.sets[0]!.id, values: measurement === 'time' ? { durationSeconds: 45 } : { distanceMeters: 125 }, now: 1600 }, { type: 'session/record', sessionId: session.id, exerciseId: id, setId: item.sets[0]!.id, now: 2000 }, { type: 'session/finish', sessionId: session.id, now: 3000, confirmed: true });
    const result = selectSessionResult(state, session.id)!;
    expect(result.exercises.find(exercise => exercise.id === id)!.sets[0]!.actual).toEqual(measurement === 'time' ? { durationSeconds: 45 } : { distanceMeters: 125 });
  });
});
