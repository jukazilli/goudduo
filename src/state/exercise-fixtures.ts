import type { Exercise } from '../domain/training';
/** Independently authored synthetic catalogue additions. No prescriptions, people or media. */
export function additionalExerciseFixtures(): Record<string, Exercise> {
  return Object.fromEntries([
    ['demo-squat', 'Agachamento — demonstração', 'repetitions'],
    ['demo-row', 'Remada — demonstração', 'repetitions'],
    ['demo-raise', 'Elevação — demonstração', 'repetitions'],
    ['demo-press', 'Desenvolvimento — demonstração', 'repetitions'],
    ['demo-curl', 'Flexão — demonstração', 'repetitions'],
    ['demo-extension', 'Extensão — demonstração', 'repetitions'],
    ['demo-plank', 'Prancha — demonstração', 'time'],
    ['demo-walk', 'Caminhada — demonstração', 'distance'],
    ['demo-mobility', 'Mobilidade — demonstração', 'time'],
  ].map(([id, name, measurement]) => [id!, { id: id!, name: name!, measurements: [measurement as 'repetitions' | 'time' | 'distance'], equipmentIds: ['demo-equipment'], muscleGroupIds: ['demo-muscle'] }]));
}
