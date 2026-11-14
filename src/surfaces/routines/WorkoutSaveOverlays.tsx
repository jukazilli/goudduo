import { useRef, useState } from 'react';
import type { RoutineOverlayContract, RoutineOverlayRenderers } from '../../app/useRoutineEditorAdapter';
import { useDemoState } from '../../state/DemoProvider';
import { readEntity, validateWorkoutName, WORKOUT_NAME_MAX_LENGTH } from '../../state/training';
import { draftIssueText } from './WorkoutEditor';

function SingleExerciseConfirmation({ contract }: { contract: RoutineOverlayContract }) {
  return <div className="workout-editor-dialog">
    <p>Você adicionou apenas 1 exercício neste treino. Deseja salvar assim mesmo?</p>
    <div className="workout-editor-dialog__actions">
      <button type="button" onClick={contract.continueEditing}>Continuar editando</button>
      <button type="button" onClick={contract.confirmSingle}>Salvar assim mesmo</button>
    </div>
  </div>;
}
function FinalWorkoutName({ contract }: { contract: RoutineOverlayContract }) {
  const state = useDemoState();
  const [name, setName] = useState(() => readEntity(state.workouts, contract.context.workoutId)?.name ?? contract.suggestedName);
  const input = useRef<HTMLInputElement>(null);
  const invalid = Boolean(validateWorkoutName(name));
  return <form className="workout-editor-dialog" onSubmit={event => { event.preventDefault(); if (!invalid) contract.submitName(name); else input.current?.focus(); }}>
    <label htmlFor="final-workout-name">Nome do treino</label>
    <input ref={input} id="final-workout-name" value={name} maxLength={WORKOUT_NAME_MAX_LENGTH} autoComplete="off" aria-invalid={invalid || undefined} aria-describedby={invalid || contract.issue ? 'workout-name-error' : undefined} onChange={event => setName(event.target.value)}/>
    {(invalid || contract.issue) && <p id="workout-name-error" role="status">{contract.issue ? draftIssueText[contract.issue] : 'Informe um nome de até 100 caracteres.'}</p>}
    <div className="workout-editor-dialog__actions">
      <button type="button" onClick={contract.continueEditing}>Cancelar</button>
      <button type="submit" disabled={invalid}>Salvar treino</button>
    </div>
  </form>;
}
export const workoutOverlayRenderers: RoutineOverlayRenderers = {
  'routine-discard': contract => ({ content: <div className="workout-editor-dialog"><div className="workout-editor-dialog__actions"><button type="button" onClick={contract.continueEditing}>Continuar editando</button><button type="button" onClick={() => contract.cancelEditing(true)}>Descartar alterações</button></div></div> }),
  'routine-library': contract => ({ content: <div className="workout-editor-dialog"><p>A Biblioteca contextual ainda não está disponível.</p><button type="button" onClick={contract.close}>Fechar</button></div> }),
  'routine-confirm-single': contract => ({ content: <SingleExerciseConfirmation contract={contract}/> }),
  'routine-naming': contract => ({ content: <FinalWorkoutName key={contract.draft.id} contract={contract}/>, initialFocus: () => document.getElementById('final-workout-name') }),
};
