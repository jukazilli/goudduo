import type { Exercise, WorkoutExercise } from '../../domain/training';
import type { DemoState } from '../../state/model';
import { readEntity } from '../../state/training';
export const normalizeExerciseQuery = (text: string) => text.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('pt-BR').trim().replace(/\s+/g, ' ');
export function libraryMatches(state: DemoState, query: string): Exercise[] {
  const catalogue = Object.entries(state.exercises).filter(([id, entry]) => entry.id === id).map(([, entry]) => entry);
  const term = normalizeExerciseQuery(query);
  if (!term) return catalogue.slice(0, 4);
  return catalogue.filter(entry => normalizeExerciseQuery([
    entry.name,
    ...(entry.muscleGroupIds ?? []).map(id => readEntity(state.muscleGroups, id)?.name ?? ''),
    ...(entry.equipmentIds ?? []).map(id => readEntity(state.equipment, id)?.name ?? ''),
  ].join(' ')).includes(term)).slice(0, 15);
}
/** Required values deliberately incomplete: no invented valid prescription defaults. */
export function createUnfilledPrescription(definition: Exercise, id: string): WorkoutExercise {
  const base = { id, exerciseId: definition.id, sets: Number.NaN, restSeconds: Number.NaN, equipmentId: null };
  const measurement = definition.measurements?.[0] ?? 'repetitions';
  if (measurement === 'time') return { ...base, measurement, durationSeconds: Number.NaN };
  if (measurement === 'distance') return { ...base, measurement, distanceMeters: Number.NaN };
  return { ...base, measurement, repsMin: Number.NaN, repsMax: Number.NaN };
}
