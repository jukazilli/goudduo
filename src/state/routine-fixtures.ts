import type { Routine, Workout } from '../domain/training';
/** Synthetic scenarios only. Existing P1 identities/one-exercise Monday stay unchanged. */
export function additionalRoutineFixtures(): { routines: Record<string, Routine>; workouts: Record<string, Workout> } {
  const multi: Workout = { id: 'demo-multi', name: 'Treino combinado de demonstração', revision: 1, exercises: [
    { id: 'demo-multi-reps', exerciseId: 'demo-exercise', sets: 2, repsMin: 8, repsMax: 12, restSeconds: 60, equipmentId: null },
    { id: 'demo-multi-time', exerciseId: 'demo-time', measurement: 'time', sets: 1, durationSeconds: 30, restSeconds: 0, equipmentId: null },
    { id: 'demo-multi-distance', exerciseId: 'demo-distance', measurement: 'distance', sets: 1, distanceMeters: 100, restSeconds: 0, equipmentId: null },
  ] };
  const home: Workout = { id: 'demo-home-workout', name: 'Treino em casa de demonstração', revision: 1, exercises: multi.exercises.slice(0, 2).map(item => ({ ...item, id: `home-${item.id}` })) };
  const run: Workout = { id: 'demo-run-workout', name: 'Treino por distância de demonstração', revision: 1, exercises: [{ id: 'demo-run-distance', exerciseId: 'demo-distance', measurement: 'distance', sets: 1, distanceMeters: 100, restSeconds: 0, equipmentId: null }] };
  const primary: Workout = { ...home, id: 'demo-primary-thu', name: 'Treino demo', exercises: home.exercises.map(item => ({ ...item, id: `primary-${item.id}` })) };
  return {
    workouts: { [multi.id]: multi, [home.id]: home, [run.id]: run, [primary.id]: primary },
    routines: {
      'demo-alternative': { id: 'demo-alternative', name: 'Alternativa demo', modality: 'Hipertrofia', days: { mon: multi.id } },
      'demo-home': { id: 'demo-home', name: 'Em casa · demo', modality: 'Funcional', days: { tue: home.id } },
      'demo-run': { id: 'demo-run', name: 'Corrida demo', modality: 'Corrida', days: { wed: run.id } },
      'demo-mobility': { id: 'demo-mobility', name: 'Mobilidade demo', modality: 'Mobilidade', days: {} },
    },
  };
}
