import { useEffect, useRef } from 'react';
import { useDemoState } from '../../state/DemoProvider';
import { selectSessionHistory } from '../../state/session-results';
import { NavLink } from '../../app/NavigationProvider';
import { CompletionTime, completionText } from './ResultFacts';
import './history.css';
export function SessionHistory({ selectedId, onSelect }: { selectedId: string | null; onSelect: (id: string) => void }) {
  const results = selectSessionHistory(useDemoState());
  const container = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const link = container.current?.querySelector<HTMLAnchorElement>('[data-selected] a'), main = link?.closest('main');
    if (!link || !main) return;
    const box = link.getBoundingClientRect(), viewport = main.getBoundingClientRect();
    if (box.top >= viewport.top && box.bottom <= viewport.bottom) link.focus({ preventScroll: true });
  }, []);
  return <section ref={container} className="session-history" aria-label="Histórico de sessões">
    <h1 tabIndex={-1}>Histórico</h1><p className="session-history__notice">Privado · somente nesta instância em memória.</p>
    {!results.length ? <div className="session-history__empty"><h2>Nenhuma sessão finalizada</h2><p>Não há registros nesta memória do protótipo.</p></div> : <ul className="session-history__list">{results.map(result => <li key={result.sessionId} data-session-id={result.sessionId} data-selected={selectedId === result.sessionId || undefined}>
      <NavLink location={{ page: { destination: 'session-result', sessionId: result.sessionId }, panel: null }} aria-label={`Abrir resultado de ${result.workoutName}`} aria-describedby={`history-time-${result.sessionId} history-status-${result.sessionId}`} aria-current={selectedId === result.sessionId ? 'true' : undefined} onClick={() => onSelect(result.sessionId)}>
        <h2>{result.workoutName}</h2><span id={`history-time-${result.sessionId}`}><CompletionTime at={result.endedAt}/></span><p id={`history-status-${result.sessionId}`}>Finalizada · {completionText(result)}</p><span>{result.recordedSetCount} {result.recordedSetCount === 1 ? 'série registrada' : 'séries registradas'}</span>
      </NavLink>
    </li>)}</ul>}
  </section>;
}
