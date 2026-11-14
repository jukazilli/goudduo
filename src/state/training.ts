import type { Routine, Weekday, Workout, WorkoutExercise } from '../domain/training';
import type { DemoState } from './model';

export type DraftIssue = 'empty' | 'invalid-prescription' | 'duplicate-exercise' | 'name-required' | 'stale-revision' | 'binding-changed' | 'shared-workout-pending' | 'confirmation-required' | 'prepare-required';
export interface WorkoutDraft {
  readonly id: string; readonly routineId: string; readonly day: Weekday;
  readonly workoutId: string; readonly baseRevision: number;
  readonly originalBinding: string | null;
  readonly exercises: readonly WorkoutExercise[];
  readonly stage: 'editing' | 'confirm-single' | 'naming';
  readonly issue: DraftIssue | null;
}
export type TrainingAction =
  | { readonly type: 'routine/create'; readonly routine: Omit<Routine, 'days'> }
  | { readonly type: 'training/select'; readonly routineId: string; readonly day: Weekday }
  | { readonly type: 'training/unlink'; readonly routineId: string; readonly day: Weekday; readonly workoutId: string; readonly revision: number }
  | { readonly type: 'draft/open'; readonly draftId: string; readonly routineId: string; readonly day: Weekday; readonly workoutId: string }
  | { readonly type: 'draft/replace-exercises'; readonly draftId: string; readonly exercises: readonly WorkoutExercise[] }
  | { readonly type: 'draft/add'; readonly draftId: string; readonly exercise: WorkoutExercise }
  | { readonly type: 'draft/update'; readonly draftId: string; readonly exercise: WorkoutExercise }
  | { readonly type: 'draft/remove'; readonly draftId: string; readonly itemId: string }
  | { readonly type: 'draft/reorder'; readonly draftId: string; readonly itemIds: readonly string[] }
  | { readonly type: 'draft/cancel'; readonly draftId: string }
  | { readonly type: 'draft/resume'; readonly draftId: string }
  | { readonly type: 'draft/prepare'; readonly draftId: string }
  | { readonly type: 'draft/confirm-single'; readonly draftId: string }
  | { readonly type: 'draft/commit'; readonly draftId: string; readonly name: string };
type LegacyCommit = { readonly type: 'workout/commit'; readonly routineId: string; readonly day: Weekday; readonly workout: Workout };
export function readEntity<T>(table: Readonly<Record<string, T>>, id: string): T | undefined {
  return Object.hasOwn(table, id) ? table[id] : undefined;
}
const weekdays: readonly string[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const validDay = (day: Weekday) => weekdays.includes(day);
const positiveInteger = (value: number) => Number.isInteger(value) && value > 0;
const nonnegative = (value: number) => Number.isFinite(value) && value >= 0;
export function clonePrescription(items: readonly WorkoutExercise[]): WorkoutExercise[] {
  return items.map(item => ({ ...item, ...(item.substituteExerciseIds ? { substituteExerciseIds: [...item.substituteExerciseIds] } : {}) }));
}
export function validatePrescription(state: DemoState, items: readonly WorkoutExercise[]): DraftIssue | null {
  if (!items.length) return 'empty';
  if (new Set(items.map(item => item.exerciseId)).size !== items.length) return 'duplicate-exercise';
  if (new Set(items.map(item => item.id)).size !== items.length) return 'invalid-prescription';
  for (const item of items) {
    const definition = readEntity(state.exercises, item.exerciseId);
    const measurement = item.measurement ?? 'repetitions';
    if (!item.id.trim() || !definition || !positiveInteger(item.sets) || !Number.isInteger(item.restSeconds) || item.restSeconds < 0 ||
        (item.loadKg !== undefined && !nonnegative(item.loadKg)) ||
        (definition.measurements && !definition.measurements.includes(measurement)) ||
        (item.equipmentId !== null && (!readEntity(state.equipment, item.equipmentId) || (definition.equipmentIds && !definition.equipmentIds.includes(item.equipmentId)))) ||
        (definition.muscleGroupIds?.some(id => !readEntity(state.muscleGroups, id))) ||
        (item.substituteExerciseIds && (new Set(item.substituteExerciseIds).size !== item.substituteExerciseIds.length || item.substituteExerciseIds.some(id => id === item.exerciseId || !readEntity(state.exercises, id))))) return 'invalid-prescription';
    switch (item.measurement) {
      case 'time': if (!Number.isFinite(item.durationSeconds) || item.durationSeconds <= 0) return 'invalid-prescription'; break;
      case 'distance': if (!Number.isFinite(item.distanceMeters) || item.distanceMeters <= 0) return 'invalid-prescription'; break;
      case undefined: case 'repetitions':
        if (!Number.isInteger(item.repsMin) || item.repsMin < 0 || !Number.isInteger(item.repsMax) || item.repsMax < item.repsMin) return 'invalid-prescription'; break;
      default: return 'invalid-prescription';
    }
  }
  return null;
}
function bindingCount(state: DemoState, id: string): number {
  return Object.values(state.routines).reduce((total, routine) => total + Object.values(routine.days).filter(value => value === id).length, 0);
}
function putDraft(state: DemoState, draft: WorkoutDraft): DemoState {
  return { ...state, drafts: { ...state.drafts, [draft.id]: draft } };
}
function discardDraft(state: DemoState, id: string): DemoState {
  const drafts = { ...state.drafts }; delete drafts[id]; return { ...state, drafts };
}
export function validateDraftContext(state: DemoState, draft: WorkoutDraft): DraftIssue | null {
  if ((readEntity(state.routines, draft.routineId)?.days[draft.day] ?? null) !== draft.originalBinding || !readEntity(state.routines, draft.routineId)) return 'binding-changed';
  if ((readEntity(state.workouts, draft.workoutId)?.revision ?? 0) !== draft.baseRevision) return 'stale-revision';
  if (bindingCount(state, draft.workoutId) > 1) return 'shared-workout-pending';
  return null;
}
/** Same gates used by the reducer and presentation adapters; no duplicate validation policy. */
export function validateDraft(state: DemoState, draft: WorkoutDraft): DraftIssue | null {
  return validateDraftContext(state, draft) ?? validatePrescription(state, draft.exercises);
}
export const WORKOUT_NAME_MAX_LENGTH = 100;
/** One name policy for the reducer and its UI consumer; no new product limit. */
export function validateWorkoutName(name: string): DraftIssue | null {
  return !name.trim() || name.trim().length > WORKOUT_NAME_MAX_LENGTH ? 'name-required' : null;
}
function commit(state: DemoState, routineId: string, day: Weekday, workout: Workout): DemoState {
  const routine = readEntity(state.routines, routineId)!;
  const saved: Workout = { ...workout, name: workout.name.trim(), exercises: clonePrescription(workout.exercises) };
  return { ...state, workouts: { ...state.workouts, [saved.id]: saved }, routines: {
    ...state.routines, [routineId]: { ...routine, days: { ...routine.days, [day]: saved.id } },
  } };
}
export function reduceTraining(state: DemoState, action: TrainingAction | LegacyCommit): DemoState {
  if (action.type === 'routine/create') {
    const routine = action.routine;
    if (!routine.id.trim() || readEntity(state.routines, routine.id) || !routine.name.trim() || routine.name.trim().length > 100) return state;
    return { ...state, routines: { ...state.routines, [routine.id]: { ...routine, ...(routine.cover ? { cover: { ...routine.cover } } : {}), name: routine.name.trim(), days: {} } },
      primaryRoutineId: state.primaryRoutineId ?? routine.id,
      selectedDayByRoutine: { ...state.selectedDayByRoutine, [routine.id]: 'mon' } };
  }
  if (action.type === 'training/select') {
    return readEntity(state.routines, action.routineId) && validDay(action.day) ? { ...state, selectedDayByRoutine: { ...state.selectedDayByRoutine, [action.routineId]: action.day } } : state;
  }
  if (action.type === 'training/unlink') {
    const routine = readEntity(state.routines, action.routineId);
    if (!routine || routine.days[action.day] !== action.workoutId || readEntity(state.workouts, action.workoutId)?.revision !== action.revision) return state;
    const days = { ...routine.days }; delete days[action.day];
    return { ...state, routines: { ...state.routines, [routine.id]: { ...routine, days } } };
  }
  if (action.type === 'workout/commit') {
    const { routineId, day, workout } = action;
    const existing = readEntity(state.workouts, workout.id);
    // Existing Lab rename scenario only: prescription edits must use validated drafts.
    // Cannot create a workout, assign another day or bypass single-exercise confirmation.
    if (!existing || readEntity(state.routines, routineId)?.days[day] !== workout.id || JSON.stringify(existing.exercises) !== JSON.stringify(workout.exercises) || !validDay(day) || !workout.id.trim() || !workout.name.trim() || workout.name.trim().length > 100 ||
        workout.revision !== (existing?.revision ?? 0) + 1 || validatePrescription(state, workout.exercises) ||
        bindingCount(state, workout.id) > (readEntity(state.routines, routineId)?.days[day] === workout.id ? 1 : 0)) return state;
    return commit(state, routineId, day, workout);
  }
  if (action.type === 'draft/open') {
    const routine = readEntity(state.routines, action.routineId);
    const binding = routine?.days[action.day] ?? null;
    if (!routine || !validDay(action.day) || !action.draftId.trim() || readEntity(state.drafts, action.draftId) || !action.workoutId.trim() ||
        (binding !== null && binding !== action.workoutId) || (binding === null && readEntity(state.workouts, action.workoutId))) return state;
    const workout = readEntity(state.workouts, action.workoutId);
    return putDraft(state, { id: action.draftId, routineId: action.routineId, day: action.day, workoutId: action.workoutId,
      originalBinding: binding, baseRevision: workout?.revision ?? 0, exercises: clonePrescription(workout?.exercises ?? []), stage: 'editing', issue: null });
  }
  const draft = readEntity(state.drafts, action.draftId);
  if (!draft) return state;
  if (action.type === 'draft/cancel') return discardDraft(state, draft.id);
  if (action.type === 'draft/resume') return putDraft(state, { ...draft, stage: 'editing', issue: null });
  if (action.type === 'draft/prepare') {
    const issue = validateDraft(state, draft);
    return putDraft(state, { ...draft, issue, stage: issue ? 'editing' : draft.exercises.length === 1 ? 'confirm-single' : 'naming' });
  }
  if (action.type === 'draft/confirm-single') {
    return draft.stage === 'confirm-single' ? putDraft(state, { ...draft, stage: 'naming', issue: null }) : state;
  }
  if (action.type === 'draft/commit') {
    const issue = validateDraft(state, draft) ??
      (draft.stage !== 'naming' ? draft.exercises.length === 1 ? 'confirmation-required' : 'prepare-required' : null) ??
      validateWorkoutName(action.name);
    if (issue) return putDraft(state, { ...draft, issue });
    return discardDraft(commit(state, draft.routineId, draft.day, { ...readEntity(state.workouts, draft.workoutId), id: draft.workoutId,
      name: action.name, revision: draft.baseRevision + 1, exercises: draft.exercises }), draft.id);
  }
  let items: readonly WorkoutExercise[] = draft.exercises;
  switch (action.type) {
    case 'draft/replace-exercises': items = action.exercises; break;
    case 'draft/add': {
      const contextIssue = validateDraftContext(state, draft);
      if (contextIssue) return putDraft(state, { ...draft, issue: contextIssue });
      if (!readEntity(state.exercises, action.exercise.exerciseId) || !action.exercise.id.trim()) return putDraft(state, { ...draft, issue: 'invalid-prescription' });
      if (items.some(item => item.exerciseId === action.exercise.exerciseId)) return putDraft(state, { ...draft, issue: 'duplicate-exercise' });
      if (items.some(item => item.id === action.exercise.id)) return putDraft(state, { ...draft, issue: 'invalid-prescription' });
      items = [...items, action.exercise]; break;
    }
    case 'draft/update':
      if (!items.some(item => item.id === action.exercise.id) || items.some(item => item.id !== action.exercise.id && item.exerciseId === action.exercise.exerciseId)) return state;
      items = items.map(item => item.id === action.exercise.id ? action.exercise : item); break;
    case 'draft/remove': items = items.filter(item => item.id !== action.itemId); break;
    case 'draft/reorder': {
      if (action.itemIds.length !== items.length || new Set(action.itemIds).size !== items.length || action.itemIds.some(id => !items.some(item => item.id === id))) return state;
      const byId = new Map(items.map(item => [item.id, item])); items = action.itemIds.map(id => byId.get(id)!); break;
    }
  }
  return putDraft(state, { ...draft, exercises: clonePrescription(items), stage: 'editing', issue: null });
}
