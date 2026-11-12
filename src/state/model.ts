/** P1 contracts authored independently. Synthetic data only; no persistence or services. */
export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export interface DemoUser { readonly id: string; readonly displayName: string; readonly professional: 'not_requested' }
export interface Exercise { readonly id: string; readonly name: string }
export interface WorkoutExercise {
  readonly id: string;
  readonly exerciseId: string;
  readonly sets: number;
  readonly repsMin: number;
  readonly repsMax: number;
  readonly restSeconds: number;
  readonly equipmentId: string | null;
  readonly loadKg?: number;
}
export interface Workout { readonly id: string; readonly name: string; readonly revision: number; readonly exercises: readonly WorkoutExercise[] }
export interface Routine { readonly id: string; readonly name: string; readonly days: Readonly<Partial<Record<Weekday, string>>> }
export interface DemoState {
  readonly user: DemoUser;
  readonly exercises: Readonly<Record<string, Exercise>>;
  readonly workouts: Readonly<Record<string, Workout>>;
  readonly routines: Readonly<Record<string, Routine>>;
  readonly primaryRoutineId: string | null;
  readonly social: { readonly liked: Readonly<Record<string, boolean>>; readonly saved: Readonly<Record<string, boolean>>; readonly reposted: Readonly<Record<string, boolean>>; readonly hidden: Readonly<Record<string, boolean>>; readonly followed: Readonly<Record<string, boolean>> };
}
export type DemoAction =
  | { readonly type: 'user/name'; readonly name: string }
  | { readonly type: 'workout/commit'; readonly routineId: string; readonly day: Weekday; readonly workout: Workout }
  | { readonly type: 'social/toggle'; readonly collection: keyof DemoState['social']; readonly id: string }
  | { readonly type: 'scenario/reset' };

export function createDemoState(): DemoState {
  return {
    user: { id: 'demo-user', displayName: 'Pessoa demonstrativa', professional: 'not_requested' },
    exercises: { 'demo-exercise': { id: 'demo-exercise', name: 'Exercício de demonstração' } },
    workouts: { 'demo-workout': { id: 'demo-workout', name: 'Treino de demonstração', revision: 1, exercises: [{ id: 'demo-item', exerciseId: 'demo-exercise', sets: 1, repsMin: 1, repsMax: 1, restSeconds: 0, equipmentId: null }] } },
    routines: { 'demo-routine': { id: 'demo-routine', name: 'Rotina de demonstração', days: { mon: 'demo-workout' } } },
    primaryRoutineId: 'demo-routine', social: { liked: {}, saved: {}, reposted: {}, hidden: {}, followed: {} },
  };
}
export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'user/name': {
      const name = action.name.trim();
      return name && name.length <= 60 ? { ...state, user: { ...state.user, displayName: name } } : state;
    }
    case 'workout/commit': {
      const routine = state.routines[action.routineId];
      const workout = action.workout;
      const existing = state.workouts[workout.id];
      const ids = new Set(workout.exercises.map(item => item.exerciseId));
      if (!routine || !workout.id || !workout.name.trim() || workout.name.length > 100 ||
          workout.exercises.length === 0 || workout.revision !== (existing?.revision ?? 0) + 1 || ids.size !== workout.exercises.length ||
          new Set(workout.exercises.map(item => item.id)).size !== workout.exercises.length ||
          workout.exercises.some(item => !item.id || !state.exercises[item.exerciseId] ||
            (item.loadKg !== undefined && (!Number.isFinite(item.loadKg) || item.loadKg < 0)) || !Number.isInteger(item.sets) || item.sets < 1 || !Number.isInteger(item.repsMin) || item.repsMin < 0 ||
            !Number.isInteger(item.repsMax) || item.repsMax < item.repsMin || !Number.isFinite(item.restSeconds) || item.restSeconds < 0)) return state;
      // Clone caller-owned values so later draft edits cannot mutate committed state.
      const committed = { ...workout, name: workout.name.trim(), exercises: workout.exercises.map(item => ({ ...item })) };
      return { ...state, workouts: { ...state.workouts, [workout.id]: committed }, routines: {
        ...state.routines, [routine.id]: { ...routine, days: { ...routine.days, [action.day]: workout.id } },
      } };
    }
    case 'social/toggle':
      return action.id ? { ...state, social: { ...state.social, [action.collection]: {
        ...state.social[action.collection], [action.id]: !state.social[action.collection][action.id],
      } } } : state;
    case 'scenario/reset': return createDemoState();
  }
}
export function selectWorkoutForDay(state: DemoState, routineId: string, day: Weekday): Workout | undefined {
  const id = state.routines[routineId]?.days[day];
  return id ? state.workouts[id] : undefined;
}
