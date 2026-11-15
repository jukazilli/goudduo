import type { ExecutionValues } from './session';
import type { Weekday, WorkoutExercise } from './training';
/** Read-only derived view, never stored in DemoState or persisted. */
export interface ResultSet {
  readonly id: string; readonly index: number;
  readonly recordedAt: number | null; readonly actual: Readonly<ExecutionValues> | null;
}
export interface ResultExercise {
  readonly id: string; readonly prescriptionItemId: string; readonly exerciseId: string; readonly name: string;
  readonly prescribed: WorkoutExercise; readonly skipped: boolean; readonly sets: readonly ResultSet[];
}
export interface SessionResult {
  readonly sessionId: string; readonly userId: string; readonly workoutId: string; readonly revision: number;
  readonly routineId: string; readonly day: Weekday; readonly workoutName: string;
  readonly startedAt: number | null; readonly endedAt: number; readonly activeMs: number;
  readonly completion: 'complete' | 'partial' | 'no-records';
  readonly performedExerciseCount: number; readonly skippedExerciseCount: number;
  readonly recordedSetCount: number; readonly unrecordedSetCount: number;
  readonly exercises: readonly ResultExercise[];
}
