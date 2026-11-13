import { describe, expect, it } from 'vitest';
import { createDemoState, demoReducer, selectWorkoutForDay, type DemoAction, type DemoState, type WorkoutExercise } from './model';
import { selectHomeTraining, selectPrimaryRoutine, selectSessionPrescription, selectTrainingDay } from './selectors';
import { validateDraft, validatePrescription } from './training';

const rep: WorkoutExercise = { id: 'rep-instance', exerciseId: 'demo-exercise', sets: 3, repsMin: 8, repsMax: 12, restSeconds: 60, equipmentId: null };
const timed: WorkoutExercise = { id: 'time-instance', exerciseId: 'demo-time', measurement: 'time', sets: 2, durationSeconds: 30, restSeconds: 10, equipmentId: null };
const distance: WorkoutExercise = { id: 'distance-instance', exerciseId: 'demo-distance', measurement: 'distance', sets: 1, distanceMeters: 100, restSeconds: 0, equipmentId: 'demo-equipment' };
const open = (state = createDemoState(), draftId = 'draft', day: 'mon' | 'tue' = 'mon', workoutId = 'demo-workout') =>
  demoReducer(state, { type: 'draft/open', draftId, routineId: 'demo-routine', day, workoutId });
const send = (state: DemoState, ...actions: DemoAction[]) => actions.reduce(demoReducer, state);
const replace = (exercises: readonly WorkoutExercise[]): DemoAction => ({ type: 'draft/replace-exercises', draftId: 'draft', exercises });
const prepare: DemoAction = { type: 'draft/prepare', draftId: 'draft' };
const confirm: DemoAction = { type: 'draft/confirm-single', draftId: 'draft' };
const save: DemoAction = { type: 'draft/commit', draftId: 'draft', name: 'Nome final' };

// Invalid saved attempts may report a draft issue, but cannot touch any saved collection.
function unchangedSaved(before: DemoState, after: DemoState) {
  for (const key of ['workouts', 'routines', 'exercises', 'equipment', 'muscleGroups', 'social', 'user'] as const) expect(after[key]).toBe(before[key]);
}
describe('training identities and parameter contracts', () => {
  it('separates deterministic catalogue, prescription and day identities', () => {
    const state = createDemoState();
    expect(state.exercises['demo-exercise']!.id).not.toBe(state.workouts['demo-workout']!.exercises[0]!.id);
    expect(selectPrimaryRoutine(state)).toBe(state.routines['demo-routine']);
    expect(selectTrainingDay(state, 'demo-routine')).toEqual({ routineId: 'demo-routine', day: 'mon', workoutId: 'demo-workout' });
    expect(validatePrescription(state, [rep, timed, distance])).toBeNull();
    expect(createDemoState()).toEqual(state);
  });
  it('creates an empty routine without sharing caller-owned cover metadata or granting capabilities', () => {
    const state = createDemoState(), cover = { kind: 'asset-reference' as const, assetId: 'synthetic-asset-reference' };
    const next = demoReducer(state, { type: 'routine/create', routine: { id: 'new-routine', name: ' Nova ', cover, modality: 'Demonstração' } });
    cover.assetId = 'changed';
    expect(next.routines['new-routine']!.days).toEqual({});
    expect(next.routines['new-routine']!.cover!.assetId).toBe('synthetic-asset-reference');
    expect(next.user.professional).toBe('not_requested');
    expect(demoReducer(next, { type: 'routine/create', routine: { id: 'new-routine', name: 'collision' } })).toBe(next);
  });
  it.each([
    { ...rep, sets: 0 }, { ...rep, sets: 1.5 }, { ...rep, restSeconds: -1 }, { ...rep, restSeconds: Infinity },
    { ...rep, loadKg: NaN }, { ...rep, repsMin: 13 }, { ...rep, repsMax: 8.5 }, { ...rep, equipmentId: 'unknown' },
    { ...rep, exerciseId: 'unknown' }, { ...rep, id: '' }, { ...timed, durationSeconds: 0 }, { ...distance, distanceMeters: -1 },
    { ...timed, exerciseId: 'demo-exercise' }, { ...rep, substituteExerciseIds: ['unknown'] },
    { ...rep, substituteExerciseIds: ['demo-exercise'] }, { ...rep, substituteExerciseIds: ['demo-time', 'demo-time'] },
  ])('rejects invalid prescription atomically: %j', item => {
    const state = send(open(), replace([item]), prepare, confirm);
    const next = demoReducer(state, save);
    expect(next.drafts.draft!.issue).toBe('invalid-prescription');
    unchangedSaved(state, next);
  });
  it('does not accept inherited object keys as catalogue or routine identities', () => {
    const state = createDemoState();
    expect(validatePrescription(state, [{ ...rep, exerciseId: 'constructor' }])).toBe('invalid-prescription');
    expect(demoReducer(state, { type: 'draft/open', draftId: 'new', routineId: 'toString', day: 'mon', workoutId: 'new' })).toBe(state);
    expect(selectWorkoutForDay(state, 'constructor', 'mon')).toBeUndefined();
  });
  it('validates catalogue equipment and muscle relationships', () => {
    const state = createDemoState();
    const constrained = { ...state, exercises: { ...state.exercises, 'demo-exercise': { ...state.exercises['demo-exercise']!, equipmentIds: [], muscleGroupIds: ['missing'] } } };
    expect(validatePrescription(constrained, [rep])).toBe('invalid-prescription');
    const equipmentOnly = { ...state, exercises: { ...state.exercises, 'demo-exercise': { ...state.exercises['demo-exercise']!, equipmentIds: [] } } };
    expect(validatePrescription(equipmentOnly, [{ ...rep, equipmentId: 'demo-equipment' }])).toBe('invalid-prescription');
  });
});
describe('draft lifecycle and atomic saving', () => {
  it('opens a deep isolated draft; edits, reorders and cancels without touching saved data', () => {
    const original = createDemoState();
    let state = open(original);
    expect(state.drafts.draft!.exercises).not.toBe(original.workouts['demo-workout']!.exercises);
    state = send(state, replace([rep, timed]), { type: 'draft/reorder', draftId: 'draft', itemIds: [timed.id, rep.id] },
      { type: 'draft/update', draftId: 'draft', exercise: { ...rep, sets: 5 } });
    expect(state.drafts.draft!.exercises.map(item => item.id)).toEqual([timed.id, rep.id]);
    unchangedSaved(original, state);
    state = demoReducer(state, { type: 'draft/cancel', draftId: 'draft' });
    expect(state.drafts).toEqual({}); unchangedSaved(original, state);
  });
  it('detaches caller-owned item objects before and after saving', () => {
    const source = { ...rep, substituteExerciseIds: ['demo-time'] };
    let state = send(open(), replace([source]), prepare, confirm);
    source.sets = 99;
    source.substituteExerciseIds.push('missing');
    state = demoReducer(state, save);
    expect(state.workouts['demo-workout']!.exercises[0]!.sets).toBe(3);
    expect(state.workouts['demo-workout']!.exercises[0]!.substituteExerciseIds).toEqual(['demo-time']);
    source.sets = 100;
    expect(state.workouts['demo-workout']!.exercises[0]!.sets).toBe(3);
  });
  it('rejects zero without fabricating an exercise or saved revision', () => {
    const state = send(open(), replace([]), prepare);
    expect(state.drafts.draft!.issue).toBe('empty');
    unchangedSaved(state, demoReducer(state, save));
  });
  it('one exercise requires explicit confirmation then final naming; cancelling keeps saved state', () => {
    let state = send(open(), replace([rep]), prepare);
    expect(state.drafts.draft!.stage).toBe('confirm-single');
    const blocked = demoReducer(state, save);
    expect(blocked.drafts.draft!.issue).toBe('confirmation-required'); unchangedSaved(state, blocked);
    state = demoReducer(state, confirm);
    expect(state.drafts.draft!.stage).toBe('naming');
    const emptyName = demoReducer(state, { ...save, type: 'draft/commit', draftId: 'draft', name: '  ' });
    expect(emptyName.drafts.draft!.issue).toBe('name-required'); unchangedSaved(state, emptyName);
    const saved = demoReducer(state, save);
    expect(saved.workouts['demo-workout']!.revision).toBe(2);
    expect(saved.workouts['demo-workout']!.name).toBe('Nome final'); expect(saved.drafts).toEqual({});
  });
  it('continues editing from confirmation without losing IDs or parameters', () => {
    const state = send(open(), replace([rep]), prepare);
    const resumed = demoReducer(state, { type: 'draft/resume', draftId: 'draft' });
    expect(resumed.drafts.draft!.stage).toBe('editing');
    expect(resumed.drafts.draft!.exercises).toBe(state.drafts.draft!.exercises);
    unchangedSaved(state, resumed);
  });
  it('retains Lab renaming but disallows its legacy action from editing prescriptions', () => {
    const state = createDemoState();
    expect(demoReducer(state, { type: 'workout/commit', routineId: 'demo-routine', day: 'mon', workout: { ...state.workouts['demo-workout']!, revision: 2, exercises: [rep] } })).toBe(state);
  });
  it('multiple exercises go directly to naming and preserve different parameters, IDs and substitutes', () => {
    const alternatives = ['demo-time'];
    const source: WorkoutExercise[] = [{ ...rep, substituteExerciseIds: alternatives }, timed, distance];
    let state = send(open(), replace(source), prepare);
    alternatives.push('unknown'); source.reverse();
    expect(state.drafts.draft!.stage).toBe('naming');
    state = demoReducer(state, save);
    expect(state.workouts['demo-workout']!.exercises).toEqual([{ ...rep, substituteExerciseIds: ['demo-time'] }, timed, distance]);
    expect(state.workouts['demo-workout']!.exercises.map(item => item.id)).toEqual([rep.id, timed.id, distance.id]);
  });
  it('invalidates confirmation/naming after any prescription edit', () => {
    const state = send(open(), replace([rep]), prepare, confirm, { type: 'draft/update', draftId: 'draft', exercise: { ...rep, loadKg: 5 } });
    expect(state.drafts.draft!.stage).toBe('editing');
    expect(demoReducer(state, save).drafts.draft!.issue).toBe('confirmation-required');
  });
  it('blocks duplicates by catalogue identity, allows removal/reinclusion and rejects invalid reorder permutations', () => {
    let state = send(open(), replace([rep]));
    const duplicate = demoReducer(state, { type: 'draft/add', draftId: 'draft', exercise: { ...rep, id: 'different-instance' } });
    expect(duplicate.drafts.draft!.issue).toBe('duplicate-exercise');
    expect(duplicate.drafts.draft!.exercises).toHaveLength(1);
    state = send(state, { type: 'draft/remove', draftId: 'draft', itemId: rep.id }, { type: 'draft/add', draftId: 'draft', exercise: rep });
    expect(state.drafts.draft!.exercises).toEqual([rep]);
    expect(demoReducer(state, { type: 'draft/reorder', draftId: 'draft', itemIds: ['missing'] })).toBe(state);
    const injected = send(state, replace([rep, { ...rep, id: 'other' }]), prepare);
    expect(injected.drafts.draft!.issue).toBe('duplicate-exercise'); unchangedSaved(injected, demoReducer(injected, save));
    expect(validatePrescription(state, [rep, { ...timed, id: rep.id }])).toBe('invalid-prescription');
  });
  it('rejects stale revisions from parallel drafts without losing either saved workout or unsaved edits', () => {
    let state = open(open(), 'other');
    state = send(state, replace([rep, timed]), prepare, save);
    state = send(state, { type: 'draft/prepare', draftId: 'other' }, { type: 'draft/commit', draftId: 'other', name: 'stale' });
    expect(state.drafts.other!.issue).toBe('stale-revision');
    expect(state.workouts['demo-workout']!.revision).toBe(2); expect(state.workouts['demo-workout']!.name).toBe('Nome final');
  });
  it('rejects missing relations, collisions and stale day bindings', () => {
    const state = open();
    expect(open(state)).toBe(state);
    expect(open(state, 'bad', 'tue', 'demo-workout')).toBe(state);
    const unlinked = demoReducer(state, { type: 'training/unlink', routineId: 'demo-routine', day: 'mon', workoutId: 'demo-workout', revision: 1 });
    expect(demoReducer(unlinked, prepare).drafts.draft!.issue).toBe('binding-changed');
    expect(demoReducer(state, { type: 'draft/open', draftId: 'missing', routineId: 'unknown', day: 'mon', workoutId: 'new' })).toBe(state);
  });
});
describe('shared consumers, bindings and session compatibility', () => {
  it('Home and Rotinas read the same saved entity and selected day, including empty/unlinked state', () => {
    let state = send(open(), replace([rep, timed]), prepare, save);
    const home = selectHomeTraining(state);
    expect(home.status).toBe('ready');
    expect(home.workout).toBe(selectWorkoutForDay(state, 'demo-routine', 'mon'));
    expect(home).toMatchObject({ name: 'Nome final', exerciseCount: 2, revision: 2, prescriptionId: 'demo-workout' });
    state = demoReducer(state, { type: 'training/select', routineId: 'demo-routine', day: 'tue' });
    expect(selectHomeTraining(state).status).toBe('no-valid-workout');
    state = send(open(state, 'draft', 'tue', 'new-workout'), replace([rep]), prepare, confirm, save);
    expect(selectHomeTraining(state).workout).toBe(state.workouts['new-workout']);
    state = demoReducer(state, { type: 'training/unlink', routineId: 'demo-routine', day: 'tue', workoutId: 'new-workout', revision: 1 });
    expect(selectHomeTraining(state).status).toBe('no-valid-workout');
    expect(selectHomeTraining({ ...state, primaryRoutineId: null }).status).toBe('no-valid-workout');
  });
  it('can represent shared references but refuses implicit propagation or implicit copying', () => {
    const original = createDemoState();
    const state: DemoState = { ...original, routines: { ...original.routines, 'demo-routine': { ...original.routines['demo-routine']!, days: { mon: 'demo-workout', tue: 'demo-workout' } } } };
    expect(selectWorkoutForDay(state, 'demo-routine', 'mon')).toBe(selectWorkoutForDay(state, 'demo-routine', 'tue'));
    const blocked = send(open(state), replace([rep]), prepare, confirm, save);
    expect(blocked.drafts.draft!.issue).toBe('shared-workout-pending');
    expect(validateDraft(state, blocked.drafts.draft!)).toBe('shared-workout-pending'); unchangedSaved(state, blocked);
    expect(demoReducer(original, { type: 'workout/commit', routineId: 'demo-routine', day: 'tue', workout: { ...original.workouts['demo-workout']!, revision: 2 } })).toBe(original);
  });
  it('independent workout identities on two days do not propagate edits', () => {
    let state = open(createDemoState(), 'draft', 'tue', 'independent');
    state = send(state, replace([rep, timed]), prepare, save);
    expect(state.workouts['demo-workout']!.revision).toBe(1);
    expect(state.workouts.independent!.revision).toBe(1);
    expect(selectWorkoutForDay(state, 'demo-routine', 'mon')).not.toBe(selectWorkoutForDay(state, 'demo-routine', 'tue'));
  });
  it('session input pins prescription identity/revision and never becomes an execution record', () => {
    let state = send(open(), replace([{ ...rep, substituteExerciseIds: ['demo-time'] }, timed]), prepare, save);
    const snapshot = selectSessionPrescription(state, 'demo-routine', 'mon')!;
    expect(snapshot.workoutId).toBe('demo-workout'); expect(snapshot.revision).toBe(2);
    expect(snapshot.exercises).not.toBe(state.workouts['demo-workout']!.exercises);
    expect(snapshot.exercises[0]!.substituteExerciseIds).not.toBe(state.workouts['demo-workout']!.exercises[0]!.substituteExerciseIds);
    state = send(open(state), replace([rep]), prepare, confirm, save);
    expect(snapshot.exercises).toHaveLength(2); expect(state.workouts['demo-workout']!.revision).toBe(3);
    expect(selectSessionPrescription(state, 'demo-routine', 'sun')).toBeUndefined();
  });
});
