import { useNavigation } from '../app/NavigationProvider';
import { useDemoDispatch, useDemoState } from '../state/DemoProvider';
import { readEntity } from '../state/training';
import type { WorkoutExercise } from '../domain/training';
/** Lab-only consumer for an empty draft while the product Library awaits P2-B5. */
export function EditorDraftTools() {
  const { location, routineContext } = useNavigation();
  const state = useDemoState(), dispatch = useDemoDispatch();
  const draft = routineContext ? readEntity(state.drafts, routineContext.draftId) : undefined;
  if (location.page.destination !== 'editor' || !draft) return null;
  const definition = Object.values(state.exercises).find(exercise => !draft.exercises.some(item => item.exerciseId === exercise.id));
  return <button className="foundation-button" type="button" disabled={!definition} onClick={() => {
    if (!definition) return;
    const common = { id: `lab-${draft.id}-${definition.id}`, exerciseId: definition.id, sets: 1, restSeconds: 0, equipmentId: null };
    const measurement = definition.measurements?.[0] ?? 'repetitions';
    const exercise: WorkoutExercise = measurement === 'time' ? { ...common, measurement, durationSeconds: 30 } : measurement === 'distance' ? { ...common, measurement, distanceMeters: 100 } : { ...common, repsMin: 8, repsMax: 12 };
    dispatch({ type: 'draft/add', draftId: draft.id, exercise });
  }}>Adicionar prescrição sintética ao rascunho</button>;
}
