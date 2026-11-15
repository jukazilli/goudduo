import type { SessionResult } from '../domain/session-result';
import type { DemoState } from './model';
import { readEntity } from './training';
import { sessionSummary } from './session';
type ResultSource = Pick<DemoState, 'trainingSessions' | 'user'>;
/** Privacy gate shared by the list, direct details and post-session summary. */
export function selectSessionResult(state: ResultSource, id: string): SessionResult | undefined {
  if (!/^[A-Za-z0-9_-]{1,80}$/.test(id)) return undefined;
  const session = readEntity(state.trainingSessions, id);
  if (!session || session.id !== id || session.userId !== state.user.id || session.status !== 'finished' ||
      session.endedAt === null || !Number.isSafeInteger(session.endedAt) || session.endedAt < 0 || !Number.isFinite(new Date(session.endedAt).getTime()) || !Number.isFinite(session.activeMs) || session.activeMs < 0) return undefined;
  const summary = sessionSummary(session);
  const exercises = session.order.map(exerciseId => {
    const item = session.exercises[exerciseId]!;
    return { id: item.id, prescriptionItemId: item.prescriptionItemId, exerciseId: item.exerciseId, name: item.name,
      prescribed: item.prescribed, skipped: item.skipped, sets: item.sets.map(set => ({ id: set.id, index: set.index,
        recordedAt: set.recordedAt ?? null, actual: set.recordedAt === undefined ? null : set.values })) };
  });
  return { sessionId: session.id, userId: session.userId, workoutId: session.prescription.workoutId, revision: session.prescription.revision,
    routineId: session.prescription.routineId, day: session.prescription.day, workoutName: session.workoutName,
    startedAt: session.startedAt, endedAt: session.endedAt, activeMs: session.activeMs,
    completion: summary.complete ? 'complete' : summary.sets.length ? 'partial' : 'no-records',
    performedExerciseCount: summary.performedExercises.length, skippedExerciseCount: summary.skippedExercises.length,
    recordedSetCount: summary.sets.length, unrecordedSetCount: exercises.reduce((total, item) => total + item.sets.length, 0) - summary.sets.length,
    exercises };
}
/** Stable, newest completion first; ASCII opaque ID ascending breaks exact timestamp ties. */
export function selectSessionHistory(state: ResultSource): readonly SessionResult[] {
  return Object.keys(state.trainingSessions).map(id => selectSessionResult(state, id)).filter((result): result is SessionResult => result !== undefined)
    .sort((a, b) => b.endedAt - a.endedAt || (a.sessionId < b.sessionId ? -1 : a.sessionId > b.sessionId ? 1 : 0));
}
