import { describe, expect, it } from 'vitest';
import { createDemoState, demoReducer, type DemoAction, type DemoState } from './model';
import { restRemainingMs, sessionActiveMs, sessionSummary } from './session';
const sessionId = 'session-one';
const send = (state: DemoState, ...actions: DemoAction[]) => actions.reduce(demoReducer, state);
function create(day: 'mon'|'thu' = 'thu', state = createDemoState()) {
  return demoReducer(state, { type: 'session/create', sessionId, routineId: 'demo-routine', day, now: 1000, origin: { destination: 'home', scroll: 120 } });
}
const start = (day: 'mon'|'thu' = 'thu') => demoReducer(create(day), { type: 'session/start', sessionId, now: 1000 });
const session = (state: DemoState) => state.trainingSessions[sessionId]!;
const first = (state: DemoState) => session(state).exercises[session(state).order[0]!]!;
const record = (state: DemoState, now = 2000) => demoReducer(state, { type: 'session/record', sessionId, exerciseId: first(state).id, setId: first(state).sets[0]!.id, now });
function savedUnchanged(before: DemoState, after: DemoState) { for (const key of ['workouts','routines','drafts','exercises','social','user'] as const) expect(after[key]).toBe(before[key]); }
describe('session identity, snapshot and transition core', () => {
  it('prepares an independent deep snapshot and stable execution/set identities without completed defaults', () => {
    const state = create(), value = session(state), source = state.workouts['demo-primary-thu']!;
    expect(value.status).toBe('prepared'); expect(value.id).not.toBe(source.id); expect(value.prescription.revision).toBe(source.revision);
    expect(value.prescription.exercises).not.toBe(source.exercises); expect(value.prescription.exercises[0]).not.toBe(source.exercises[0]);
    expect(new Set(Object.values(value.exercises).flatMap(item => [item.id, ...item.sets.map(set => set.id)])).size).toBe(5);
    expect(sessionSummary(value).sets).toHaveLength(0);
  });
  it('refuses invalid/empty prescriptions, wrong day, duplicate ID, concurrent prepared sessions and unsafe clocks/allocation', () => {
    const initial = createDemoState();
    for (const invalid of [{ ...initial, workouts: { ...initial.workouts, 'demo-primary-thu': { ...initial.workouts['demo-primary-thu']!, exercises: [] } } },
      { ...initial, workouts: { ...initial.workouts, 'demo-primary-thu': { ...initial.workouts['demo-primary-thu']!, exercises: [{ ...initial.workouts['demo-primary-thu']!.exercises[0]!, sets: 1e9 }] } } }]) expect(create('thu', invalid)).toBe(invalid);
    const state = create();
    expect(create('thu', state)).toBe(state);
    expect(demoReducer(state, { type: 'session/create', sessionId: 'other', routineId: 'demo-routine', day: 'mon', now: 2000, origin: { destination: 'rotinas', scroll: 0 } })).toBe(state);
    expect(demoReducer(initial, { type: 'session/create', sessionId, routineId: 'demo-routine', day: 'tue', now: 1000, origin: { destination: 'home', scroll: 0 } })).toBe(initial);
    expect(demoReducer(state, { type: 'session/start', sessionId, now: Infinity })).toBe(state);
  });
  it('requires start, valid series identity and explicit confirmation; double record is idempotent', () => {
    const prepared = create('mon'); expect(record(prepared)).toBe(prepared);
    const state = start('mon'), after = record(state); savedUnchanged(state, after);
    expect(sessionSummary(session(after)).sets).toHaveLength(1);
    expect(record(after, 2001)).toBe(after);
    expect(demoReducer(state, { type: 'session/record', sessionId, exerciseId: first(state).id, setId: 'missing', now: 2000 })).toBe(state);
  });
  it.each([-1, NaN, Infinity, 1.5, 0])('rejects invalid actual repetitions %s atomically', repetitions => {
    let state = start('mon'); const item = first(state);
    state = demoReducer(state, { type: 'session/input', sessionId, exerciseId: item.id, setId: item.sets[0]!.id, values: { repetitions }, now: 2000 });
    expect(record(state, 3000)).toBe(state); expect(sessionSummary(session(state)).sets).toHaveLength(0);
  });
  it('validates actual load, preserves legitimate fractions, and distinguishes time/distance without converting units', () => {
    let state = start(); const item = first(state), id = item.sets[0]!.id;
    state = demoReducer(state, { type: 'session/input', sessionId, exerciseId: item.id, setId: id, values: { repetitions: 9, loadKg: -2 }, now: 2000 }); expect(record(state, 2000)).toBe(state);
    state = demoReducer(state, { type: 'session/input', sessionId, exerciseId: item.id, setId: id, values: { repetitions: 9, loadKg: 7.5 }, now: 2001 });
    state = record(state, 2002); expect(first(state).sets[0]!.values.loadKg).toBe(7.5);
    state = demoReducer(state, { type: 'session/rest-skip', sessionId, now: 2003 });
    const timed = session(state).exercises[session(state).order[1]!]!;
    state = demoReducer(state, { type: 'session/select', sessionId, exerciseId: timed.id, now: 2003 });
    state = demoReducer(state, { type: 'session/input', sessionId, exerciseId: timed.id, setId: timed.sets[0]!.id, values: { repetitions: 12 }, now: 2004 });
    expect(demoReducer(state, { type: 'session/record', sessionId, exerciseId: timed.id, setId: timed.sets[0]!.id, now: 2005 })).toBe(state);
    state = demoReducer(state, { type: 'session/input', sessionId, exerciseId: timed.id, setId: timed.sets[0]!.id, values: { durationSeconds: 45 }, now: 2005 });
    state = demoReducer(state, { type: 'session/record', sessionId, exerciseId: timed.id, setId: timed.sets[0]!.id, now: 2006 }); expect(sessionSummary(session(state)).sets[1]!.values.durationSeconds).toBe(45);
    let distance = demoReducer(createDemoState(), { type: 'session/create', sessionId, routineId: 'demo-run', day: 'wed', now: 1000, origin: { destination: 'rotinas', scroll: 0 } });
    distance = demoReducer(distance, { type: 'session/start', sessionId, now: 1000 }); distance = record(distance); expect(first(distance).sets[0]!.values.distanceMeters).toBe(100);
  });
  it('derives rest from deadlines, expires once and never trusts interval callback counts', () => {
    const state = record(start()); expect(session(state).status).toBe('resting');
    expect(restRemainingMs(session(state), 31000)).toBe(31000);
    expect(demoReducer(state, { type: 'session/rest-expire', sessionId, now: 61999 })).toBe(state);
    const expired = demoReducer(state, { type: 'session/rest-expire', sessionId, now: 62000 });
    expect(session(expired).status).toBe('running'); expect(restRemainingMs(session(expired), 70000)).toBe(0);
    expect(demoReducer(expired, { type: 'session/rest-expire', sessionId, now: 70000 })).toBe(expired);
  });
  it('pauses active and rest clocks, resumes the same session and skips rest without adding execution', () => {
    let state = record(start()); state = demoReducer(state, { type: 'session/pause', sessionId, now: 12000 });
    expect(sessionActiveMs(session(state), 999999)).toBe(11000); expect(restRemainingMs(session(state), 999999)).toBe(50000);
    expect(record(state, 13000)).toBe(state);
    state = demoReducer(state, { type: 'session/resume', sessionId, now: 100000 });
    expect(sessionActiveMs(session(state), 101000)).toBe(12000); expect(restRemainingMs(session(state), 101000)).toBe(49000);
    state = demoReducer(state, { type: 'session/rest-skip', sessionId, now: 101000 });
    expect(session(state).id).toBe(sessionId); expect(sessionSummary(session(state)).sets).toHaveLength(1);
  });
  it('skips without completing pending series and preserves partial actual records', () => {
    let state = record(start()); state = demoReducer(state, { type: 'session/rest-skip', sessionId, now: 3000 });
    state = demoReducer(state, { type: 'session/skip', sessionId, exerciseId: first(state).id, now: 4000 });
    expect(first(state).skipped).toBe(true); expect(first(state).sets[1]!.recordedAt).toBeUndefined();
    expect(sessionSummary(session(state))).toMatchObject({ complete: false }); expect(sessionSummary(session(state)).sets).toHaveLength(1);
  });
  it('reorders execution by identity while preserving selection, sets and saved prescription order', () => {
    const state = record(start()), original = session(state);
    const reordered = demoReducer(state, { type: 'session/reorder', sessionId, ids: [...original.order].reverse(), now: 3000 });
    expect(session(reordered).exercises).toBe(original.exercises); expect(session(reordered).activeExerciseId).toBe(original.activeExerciseId);
    expect(session(reordered).prescription).toBe(original.prescription); savedUnchanged(state, reordered);
    expect(demoReducer(reordered, { type: 'session/reorder', sessionId, ids: ['wrong'], now: 4000 })).toBe(reordered);
  });
  it('keeps the old snapshot when an Editor commits a new saved revision, including substitute metadata', () => {
    let initial = createDemoState(); const saved = initial.workouts['demo-workout']!;
    initial = { ...initial, workouts: { ...initial.workouts, [saved.id]: { ...saved, exercises: [{ ...saved.exercises[0]!, substituteExerciseIds: ['demo-time'] }] } } };
    let state = create('mon', initial); const snapshot = session(state).prescription;
    state = send(state, { type: 'draft/open', draftId: 'edit', routineId: 'demo-routine', day: 'mon', workoutId: saved.id },
      { type: 'draft/update', draftId: 'edit', exercise: { ...saved.exercises[0]!, sets: 5 } }, { type: 'draft/prepare', draftId: 'edit' }, { type: 'draft/confirm-single', draftId: 'edit' }, { type: 'draft/commit', draftId: 'edit', name: 'Revised' });
    expect(state.workouts[saved.id]!.revision).toBe(2); expect(session(state).prescription).toBe(snapshot);
    expect(snapshot.revision).toBe(1); expect(snapshot.exercises[0]!.sets).toBe(1); expect(snapshot.exercises[0]!.substituteExerciseIds).toEqual(['demo-time']);
  });
  it('confirms partial/empty finish, finishes complete explicitly, freezes time and never duplicates a result', () => {
    const empty = start('mon'); expect(demoReducer(empty, { type: 'session/finish', sessionId, now: 3000, confirmed: false })).toBe(empty);
    const partial = demoReducer(empty, { type: 'session/finish', sessionId, now: 3000, confirmed: true }); expect(sessionSummary(session(partial)).sets).toHaveLength(0);
    const done = record(start('mon')); expect(session(done).status).toBe('running');
    const finished = demoReducer(done, { type: 'session/finish', sessionId, now: 3000, confirmed: true });
    expect(session(finished).status).toBe('finished'); expect(finished.activeTrainingSessionId).toBeNull();
    expect(sessionActiveMs(session(finished), 900000)).toBe(2000); expect(record(finished, 4000)).toBe(finished);
    expect(demoReducer(finished, { type: 'session/finish', sessionId, now: 4000, confirmed: true })).toBe(finished);
    savedUnchanged(done, finished);
  });
  it.each(['complete', 'partial'] as const)('requires domain confirmation even for a %s execution and commits exactly once after consent', kind => {
    const state = record(start(kind === 'complete' ? 'mon' : 'thu'));
    const rejected = demoReducer(state, { type: 'session/finish', sessionId, now: 3000, confirmed: false });
    expect(rejected).toBe(state); expect(session(rejected).endedAt).toBeNull();
    expect(rejected.activeTrainingSessionId).toBe(sessionId); savedUnchanged(state, rejected);
    const finished = demoReducer(rejected, { type: 'session/finish', sessionId, now: 3000, confirmed: true });
    expect(session(finished).status).toBe('finished'); expect(sessionSummary(session(finished)).sets).toHaveLength(1);
    expect(sessionSummary(session(finished)).complete).toBe(kind === 'complete');
    expect(demoReducer(finished, { type: 'session/finish', sessionId, now: 4000, confirmed: true })).toBe(finished);
    savedUnchanged(state, finished);
  });
  it('requires explicit discard, keeps other completed sessions and never resumes discarded data', () => {
    const state = start('mon'); expect(demoReducer(state, { type: 'session/discard', sessionId, now: 2000, confirmed: false })).toBe(state);
    const discarded = demoReducer(state, { type: 'session/discard', sessionId, now: 2000, confirmed: true });
    expect(session(discarded).status).toBe('discarded'); expect(discarded.activeTrainingSessionId).toBeNull();
    expect(demoReducer(discarded, { type: 'session/resume', sessionId, now: 3000 })).toBe(discarded);
    const next = demoReducer(discarded, { type: 'session/create', sessionId: 'new', routineId: 'demo-routine', day: 'mon', now: 3000, origin: { destination: 'home', scroll: 0 } });
    expect(next.trainingSessions[sessionId]).toBe(session(discarded)); expect(next.activeTrainingSessionId).toBe('new');
    expect(createDemoState().trainingSessions).toEqual({});
  });
});
