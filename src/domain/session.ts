import type { SessionPrescription, WorkoutExercise } from './training';
export type SessionStatus = 'prepared' | 'running' | 'resting' | 'paused' | 'finished' | 'discarded';
export interface ExecutionValues {
  readonly repetitions?: number; readonly loadKg?: number;
  readonly durationSeconds?: number; readonly distanceMeters?: number;
}
export interface ExecutedSet {
  readonly id: string; readonly index: number; readonly values: ExecutionValues;
  readonly recordedAt?: number;
}
export interface SessionExercise {
  readonly id: string; readonly prescriptionItemId: string; readonly exerciseId: string;
  readonly name: string; readonly prescribed: WorkoutExercise;
  readonly selectedSetId: string; readonly sets: readonly ExecutedSet[]; readonly skipped: boolean;
}
export interface TrainingSession {
  readonly id: string; readonly userId: string; readonly workoutName: string;
  readonly prescription: SessionPrescription;
  readonly status: SessionStatus; readonly exercises: Readonly<Record<string, SessionExercise>>;
  readonly order: readonly string[]; readonly activeExerciseId: string;
  readonly createdAt: number; readonly startedAt: number | null; readonly endedAt: number | null;
  readonly activeMs: number; readonly runningSince: number | null; readonly lastEventAt: number;
  readonly rest: { readonly deadline: number | null; readonly remainingMs: number } | null;
  readonly origin: { readonly destination: 'home' | 'rotinas'; readonly scroll: number };
}
