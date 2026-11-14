import { useEffect, useRef, useState } from 'react';
import { Check, Plus, Search } from 'lucide-react';
import type { RoutineOverlayContract } from '../../app/useRoutineEditorAdapter';
import { useNavigation } from '../../app/NavigationProvider';
import { useDemoDispatch, useDemoState } from '../../state/DemoProvider';
import { readEntity, validateDraftContext } from '../../state/training';
import { draftIssueText } from './WorkoutEditor';
import { createUnfilledPrescription, libraryMatches } from './library-model';
import './contextual-library.css';

export function ContextualExerciseLibrary({ contract }: { contract: RoutineOverlayContract }) {
  const state = useDemoState(), dispatch = useDemoDispatch();
  const { location, routineContext } = useNavigation();
  const draft = readEntity(state.drafts, contract.context.draftId);
  const available = draft && routineContext && location.page.destination === 'editor' && location.panel === 'routine-library' &&
    routineContext.draftId === draft.id && draft.id === contract.context.draftId && draft.routineId === routineContext.routineId &&
    draft.day === routineContext.day && draft.workoutId === routineContext.workoutId && location.page.workoutId === draft.workoutId && draft.baseRevision === routineContext.baseRevision;
  const contextIssue = draft ? validateDraftContext(state, draft) : null;
  const additionIssue = contextIssue ?? draft?.issue;
  const [query, setQuery] = useState('');
  const [feedback, setFeedback] = useState<{ id: string } | null>(null);
  const results = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // Only in-flight acknowledgement intents. Added/check state always derives from draft.
  const pending = useRef(new Map<string, string>());
  useEffect(() => {
    if (!pending.current.size) return;
    let acknowledged: string | undefined;
    for (const [id, exerciseId] of pending.current) { if (draft?.exercises.some(item => item.id === id && item.exerciseId === exerciseId)) acknowledged = id; }
    pending.current.clear();
    if (acknowledged) {
      clearTimeout(timer.current); setFeedback({ id: acknowledged });
      timer.current = setTimeout(() => setFeedback(null), 1350);
    }
  }, [draft]);
  useEffect(() => () => { clearTimeout(timer.current); pending.current.clear(); }, []);
  const matches = libraryMatches(state, query);
  return <div className="contextual-library">
    <label className="contextual-library__search"><Search size={20} aria-hidden="true"/><input id="contextual-exercise-search" type="search" autoComplete="off" placeholder="Pesquisar exercícios" aria-label="Pesquisar exercícios na biblioteca" value={query} onChange={event => {
      setQuery(event.target.value); if (results.current) results.current.scrollTop = 0;
    }}/></label>
    <div className="contextual-library__meta"><strong>{query.trim() ? 'Resultados da busca' : 'Exercícios sugeridos'}</strong><span>{draft?.exercises.length ?? 0} {(draft?.exercises.length ?? 0) === 1 ? 'exercício' : 'exercícios'} no treino</span></div>
    <div ref={results} className="contextual-library__results" role="list" aria-label="Exercícios da biblioteca">
      {matches.map(definition => {
        const added = Boolean(draft?.exercises.some(item => item.exerciseId === definition.id));
        const metadata = [...(definition.muscleGroupIds ?? []).map(id => readEntity(state.muscleGroups, id)?.name), ...(definition.equipmentIds ?? []).map(id => readEntity(state.equipment, id)?.name)].filter(Boolean).join(' · ');
        return <div role="listitem" key={definition.id}><button type="button" data-exercise-id={definition.id} aria-label={`${definition.name} ${added ? 'já adicionado ao treino' : 'adicionar ao treino'}`} aria-disabled={added || !available || Boolean(contextIssue)} onClick={() => {
          if (!available || !draft || contextIssue || added || [...pending.current.values()].includes(definition.id)) return;
          const id = crypto.randomUUID(); pending.current.set(id, definition.id);
          dispatch({ type: 'draft/add', draftId: draft.id, exercise: createUnfilledPrescription(definition, id) });
        }}>
          <span className="contextual-library__name">{definition.name}{metadata && <small>{metadata}</small>}</span>
          <span className="contextual-library__add" aria-hidden="true">{added ? <Check size={18}/> : <Plus size={18}/>}</span>
        </button></div>;
      })}
      {!matches.length && <p className="contextual-library__empty">Nenhum exercício encontrado.</p>}
    </div>
    <div className="contextual-library__feedback" role="status" aria-live="polite" aria-atomic="true">{additionIssue ? draftIssueText[additionIssue] : !draft ? 'Esta opção ainda não está disponível.' : feedback ? <span key={feedback.id}>Adicionado</span> : null}</div>
  </div>;
}
