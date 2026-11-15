import { useDemoState } from '../../state/DemoProvider';
import { selectSessionResult } from '../../state/session-results';
import { NavLink } from '../../app/NavigationProvider';
import { CompletionTime, completionText, executionText, RecordedFacts } from './ResultFacts';
import { durationText } from './ResultFacts';
import './history.css';
export function SessionResult({ sessionId }: { sessionId: string }) {
  const result = selectSessionResult(useDemoState(), sessionId);
  if (!result) return <section className="session-history"><h1 tabIndex={-1}>Resultado indisponível</h1><p>Não há resultado acessível nesta memória do protótipo.</p><NavLink location={{ page: { destination: 'history' }, panel: null }}>Histórico</NavLink></section>;
  return <section className="session-history" aria-label="Resultado da sessão" data-result-id={result.sessionId} data-workout-id={result.workoutId} data-revision={result.revision}>
    <h1 tabIndex={-1}>Resultado da sessão</h1><h2>{result.workoutName}</h2><p className="session-history__notice">Privado · resultado em memória, sem persistência.</p>
    <p><CompletionTime at={result.endedAt}/></p><p>Finalizada · {completionText(result)}</p><p>Prescrição executada · revisão {result.revision}</p><RecordedFacts result={result}/>
    <p>{result.unrecordedSetCount} {result.unrecordedSetCount === 1 ? 'série não realizada' : 'séries não realizadas'}</p>
    {result.exercises.map(item => <article key={item.id} className="session-history__exercise" data-prescription-item-id={item.prescriptionItemId}>
      <h3>{item.name}</h3>{item.skipped && <p>Pulado</p>}
      <h4>Prescrito</h4><p>{item.prescribed.sets} {item.prescribed.sets === 1 ? 'série' : 'séries'} · {item.prescribed.measurement === 'time' ? `${item.prescribed.durationSeconds} s` : item.prescribed.measurement === 'distance' ? `${item.prescribed.distanceMeters} m` : `${item.prescribed.repsMin}–${item.prescribed.repsMax} repetições`}{item.prescribed.loadKg !== undefined ? ` · ${item.prescribed.loadKg} kg` : ''} · Descanso {durationText(item.prescribed.restSeconds * 1000)}</p>
      <h4>Realizado</h4><ol>{item.sets.map(set => <li key={set.id} data-set-id={set.id}>Série {set.index + 1}: {set.actual === null ? 'Não realizada' : executionText(set.actual)}</li>)}</ol>
    </article>)}
    <NavLink location={{ page: { destination: 'history' }, panel: null }}>Histórico</NavLink>
  </section>;
}
