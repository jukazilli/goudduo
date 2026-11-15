import { describe, expect, it } from 'vitest';
import { createDemoState, demoReducer, type DemoAction, type DemoState } from './model';
import { selectHomeTraining } from './selectors';
import { createUnfilledPrescription } from '../surfaces/routines/library-model';
const send = (state: DemoState, ...actions: DemoAction[]) => actions.reduce(demoReducer, state);
const open = (draftId: string, workoutId: string): DemoAction => ({ type: 'draft/open', draftId, workoutId, routineId: 'demo-routine', day: 'tue' });
function ready(state: DemoState, draftId: string) {
  const exercise = { ...createUnfilledPrescription(state.exercises['demo-squat']!, `${draftId}-instance`), sets: 3, repsMin: 8, repsMax: 12, restSeconds: 60 };
  return send(state, { type: 'draft/add', draftId, exercise }, { type: 'draft/prepare', draftId }, { type: 'draft/confirm-single', draftId });
}
describe('integrated Library → draft → day → Home invariants', () => {
  it('two creations for the same empty day cannot overwrite the first saved binding or create an orphan workout', () => {
    let state = send(createDemoState(), open('first', 'first-workout'), open('second', 'second-workout'), { type: 'training/select', routineId: 'demo-routine', day: 'tue' });
    state = ready(ready(state, 'first'), 'second');
    const otherDraft = state.drafts.second;
    const saved = demoReducer(state, { type: 'draft/commit', draftId: 'first', name: 'First' });
    expect(saved.drafts.second).toBe(otherDraft);
    expect(selectHomeTraining(saved).workout).toBe(saved.workouts['first-workout']);
    const rejected = demoReducer(saved, { type: 'draft/commit', draftId: 'second', name: 'Second' });
    expect(rejected.drafts.second!.issue).toBe('binding-changed');
    expect(rejected.workouts).toBe(saved.workouts); expect(rejected.routines).toBe(saved.routines);
    expect(rejected.workouts['second-workout']).toBeUndefined();
    expect(rejected.drafts.second!.exercises).toEqual(otherDraft!.exercises);
    const cancelled = demoReducer(rejected, { type: 'draft/cancel', draftId: 'second' });
    expect(selectHomeTraining(cancelled).workout).toBe(saved.workouts['first-workout']);
    expect(cancelled.workouts['demo-workout']).toBe(state.workouts['demo-workout']);
  });
  it('Library additions stay invalid until configured, and a prepared draft cannot commit after the saved revision changes', () => {
    let state = createDemoState();
    state = send(state, { type: 'draft/open', draftId: 'edit', routineId: 'demo-routine', day: 'mon', workoutId: 'demo-workout' });
    const addition = createUnfilledPrescription(state.exercises['demo-plank']!, 'new-instance');
    if (addition.measurement !== 'time') throw new Error('Expected a time-based catalogue fixture');
    state = send(state, { type: 'draft/add', draftId: 'edit', exercise: addition }, { type: 'draft/prepare', draftId: 'edit' });
    expect(state.drafts.edit!.issue).toBe('invalid-prescription'); expect(state.workouts['demo-workout']!.exercises).toHaveLength(1);
    state = send(state, { type: 'draft/update', draftId: 'edit', exercise: { ...addition, sets: 2, durationSeconds: 30, restSeconds: 10 } }, { type: 'draft/prepare', draftId: 'edit' });
    expect(state.drafts.edit!.stage).toBe('naming');
    const saved = state.workouts['demo-workout']!;
    const concurrent = { ...state, workouts: { ...state.workouts, [saved.id]: { ...saved, revision: saved.revision + 1 } } };
    const rejected = demoReducer(concurrent, { type: 'draft/commit', draftId: 'edit', name: 'Obsolete' });
    expect(rejected.drafts.edit!.issue).toBe('stale-revision');
    expect(rejected.workouts).toBe(concurrent.workouts); expect(rejected.routines).toBe(concurrent.routines);
    expect(selectHomeTraining(rejected).workout).toBe(concurrent.workouts[saved.id]);
    expect(rejected.drafts.edit!.exercises).toHaveLength(2);
  });
});
