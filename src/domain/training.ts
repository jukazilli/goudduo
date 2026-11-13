/** Independently authored, in-memory prototype contracts. IDs are supplied by callers. */
export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type Measurement = 'repetitions' | 'time' | 'distance';
export interface Equipment { readonly id: string; readonly name: string }
export interface MuscleGroup { readonly id: string; readonly name: string }
export interface Exercise {
  readonly id: string; readonly name: string;
  readonly measurements?: readonly Measurement[];
  readonly equipmentIds?: readonly string[];
  readonly muscleGroupIds?: readonly string[];
  readonly authorId?: string;
}
interface PrescriptionBase {
  readonly id: string; readonly exerciseId: string; readonly sets: number;
  readonly restSeconds: number; readonly equipmentId: string | null;
  readonly loadKg?: number;
  /** Alternatives refer to catalogue definitions; they do not inherit execution records. */
  readonly substituteExerciseIds?: readonly string[];
}
export type WorkoutExercise = PrescriptionBase & (
  | { readonly measurement?: 'repetitions'; readonly repsMin: number; readonly repsMax: number }
  | { readonly measurement: 'time'; readonly durationSeconds: number }
  | { readonly measurement: 'distance'; readonly distanceMeters: number }
);
export interface Workout {
  readonly id: string; readonly name: string; readonly revision: number;
  /** Array order is prescription order, not catalogue identity. */
  readonly exercises: readonly WorkoutExercise[];
  readonly authorId?: string;
}
export interface Routine {
  readonly id: string; readonly name: string;
  /** One authoritative association per (routineId, weekday); values reference saved workouts. */
  readonly days: Readonly<Partial<Record<Weekday, string>>>;
  readonly modality?: string;
  readonly cover?: { readonly kind: 'asset-reference'; readonly assetId: string };
}
export interface TrainingDay { readonly routineId: string; readonly day: Weekday; readonly workoutId: string | null }
/** Representable alternatives, deliberately not an implicit assignment policy. */
export type DayAssignmentIntent = 'reference' | 'independent-copy';
/** Future session input, distinct from execution and independent of subsequent edits. */
export interface SessionPrescription {
  readonly workoutId: string; readonly revision: number;
  readonly routineId: string; readonly day: Weekday;
  readonly exercises: readonly WorkoutExercise[];
}
export interface ExerciseExecution {
  readonly prescriptionItemId: string;
  readonly completedSets: number;
  readonly actualRepetitions?: number;
  readonly actualDurationSeconds?: number;
  readonly actualDistanceMeters?: number;
}
