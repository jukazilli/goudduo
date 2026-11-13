/** P1 contracts authored independently. Synthetic data only; no persistence or services. */
import type { Equipment, Exercise, MuscleGroup, Routine, Weekday, Workout } from '../domain/training';
import { readEntity, reduceTraining, type TrainingAction, type WorkoutDraft } from './training';
export type { Equipment, Exercise, MuscleGroup, Routine, Weekday, Workout, WorkoutExercise } from '../domain/training';
export interface DemoUser { readonly id: string; readonly displayName: string; readonly professional: 'not_requested' }
export interface DemoState {
  readonly user: DemoUser;
  readonly exercises: Readonly<Record<string, Exercise>>;
  readonly workouts: Readonly<Record<string, Workout>>;
  readonly routines: Readonly<Record<string, Routine>>;
  readonly primaryRoutineId: string | null;
  readonly equipment: Readonly<Record<string, Equipment>>;
  readonly muscleGroups: Readonly<Record<string, MuscleGroup>>;
  readonly drafts: Readonly<Record<string, WorkoutDraft>>;
  readonly selectedDayByRoutine: Readonly<Record<string, Weekday>>;
  readonly social: { readonly liked: Readonly<Record<string, boolean>>; readonly saved: Readonly<Record<string, boolean>>; readonly reposted: Readonly<Record<string, boolean>>; readonly hidden: Readonly<Record<string, boolean>>; readonly followed: Readonly<Record<string, boolean>> };
}
export type DemoAction = TrainingAction
  | { readonly type: 'user/name'; readonly name: string }
  | { readonly type: 'workout/commit'; readonly routineId: string; readonly day: Weekday; readonly workout: Workout }
  | { readonly type: 'social/toggle'; readonly collection: keyof DemoState['social']; readonly id: string }
  | { readonly type: 'scenario/reset' };

export function createDemoState(): DemoState {
  return {
    user: { id: 'demo-user', displayName: 'Pessoa demonstrativa', professional: 'not_requested' },
    exercises: {
      'demo-exercise': { id: 'demo-exercise', name: 'Exercício de demonstração', measurements: ['repetitions'] },
      'demo-time': { id: 'demo-time', name: 'Exercício sintético por tempo', measurements: ['time'] },
      'demo-distance': { id: 'demo-distance', name: 'Exercício sintético por distância', measurements: ['distance'] },
    },
    equipment: { 'demo-equipment': { id: 'demo-equipment', name: 'Equipamento sintético' } },
    muscleGroups: { 'demo-muscle': { id: 'demo-muscle', name: 'Grupo sintético' } },
    drafts: {}, selectedDayByRoutine: { 'demo-routine': 'mon' },
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
    case 'workout/commit':
      // Compatibility for the existing Lab only; shares validation and refuses ambiguous bindings.
      return reduceTraining(state, action);
    case 'social/toggle':
      return action.id ? { ...state, social: { ...state.social, [action.collection]: {
        ...state.social[action.collection], [action.id]: !state.social[action.collection][action.id],
      } } } : state;
    case 'scenario/reset': return createDemoState();
    default: return reduceTraining(state, action);
  }
}
export function selectWorkoutForDay(state: DemoState, routineId: string, day: Weekday): Workout | undefined {
  const id = readEntity(state.routines, routineId)?.days[day];
  return id ? readEntity(state.workouts, id) : undefined;
}
