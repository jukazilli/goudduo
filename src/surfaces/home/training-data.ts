import type { Weekday } from '../../domain/training';
import type { DemoState } from '../../state/model';
import { selectPrimaryRoutine, selectTrainingDay } from '../../state/selectors';
import { selectWorkoutForDay } from '../../state/model';
import { validatePrescription } from '../../state/training';
export const trainingWeek: readonly Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export const trainingDayNames: Record<Weekday, string> = { mon: 'segunda-feira', tue: 'terça-feira', wed: 'quarta-feira', thu: 'quinta-feira', fri: 'sexta-feira', sat: 'sábado', sun: 'domingo' };
/** Existing valid prescriptions, never copies or generated carousel examples. */
export function selectHeroChoices(state: DemoState) {
  const routine = selectPrimaryRoutine(state);
  if (!routine) return [];
  const selected = selectTrainingDay(state, routine.id);
  const seen = new Set<string>();
  // For explicit shared bindings, retain the selected day without choosing a copy policy.
  return [...trainingWeek].sort((a, b) => Number(b === selected?.day) - Number(a === selected?.day))
    .flatMap(day => {
      const workout = selectWorkoutForDay(state, routine.id, day);
      if (!workout || seen.has(workout.id) || validatePrescription(state, workout.exercises)) return [];
      seen.add(workout.id); return [{ routineId: routine.id, day, workout }];
    }).sort((a, b) => trainingWeek.indexOf(a.day) - trainingWeek.indexOf(b.day));
}
