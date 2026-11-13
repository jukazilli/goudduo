import type { SessionPrescription, TrainingDay, Weekday } from '../domain/training';
import { selectWorkoutForDay, type DemoState } from './model';
import { clonePrescription, readEntity, validatePrescription } from './training';

export function selectPrimaryRoutine(state: DemoState) {
  return state.primaryRoutineId ? readEntity(state.routines, state.primaryRoutineId) : undefined;
}
export function selectTrainingDay(state: DemoState, routineId: string): TrainingDay | undefined {
  const routine = readEntity(state.routines, routineId);
  if (!routine) return undefined;
  const day = state.selectedDayByRoutine[routineId] ?? 'mon';
  return { routineId, day, workoutId: routine.days[day] ?? null };
}
/** Derived descriptor only: routine/workout are the saved entities, never copies or caches. */
export function selectHomeTraining(state: DemoState) {
  const routine = selectPrimaryRoutine(state);
  const selection = routine ? selectTrainingDay(state, routine.id) : undefined;
  const workout = selection ? selectWorkoutForDay(state, selection.routineId, selection.day) : undefined;
  if (!routine || !selection || !workout || validatePrescription(state, workout.exercises)) {
    return { status: 'no-valid-workout' as const, routine, selection, workout: undefined };
  }
  return { status: 'ready' as const, routine, selection, workout, name: workout.name,
    exerciseCount: workout.exercises.length, revision: workout.revision, prescriptionId: workout.id };
}
/** Compatibility boundary only, not an operational session or execution history. */
export function selectSessionPrescription(state: DemoState, routineId: string, day: Weekday): SessionPrescription | undefined {
  const workout = selectWorkoutForDay(state, routineId, day);
  if (!workout || validatePrescription(state, workout.exercises)) return undefined;
  return { routineId, day, workoutId: workout.id, revision: workout.revision, exercises: clonePrescription(workout.exercises) };
}
