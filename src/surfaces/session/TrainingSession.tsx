import { selectSessionResult } from '../../state/session-results';
import { useDemoState } from '../../state/DemoProvider';
import { NavLink } from '../../app/NavigationProvider';
import { RecordedFacts, RecordedExercises } from '../history/ResultFacts';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ListOrdered, MoreHorizontal } from 'lucide-react';
import type { ExecutionValues, TrainingSession as Session } from '../../domain/session';
import type { TrainingSessionAdapter } from '../../app/useTrainingSession';
import type { ContextualOverlay } from '../../app/surface-contracts';
import type { SessionPanel } from '../../app/session-context';
import { restRemainingMs, sessionActiveMs, sessionSummary, validExecution } from '../../state/session';
import './session.css';
export function sessionClock(ms: number, rounding: 'floor' | 'ceil' = 'floor') {
  const seconds = Math.max(0, Math[rounding](ms / 1000));
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(value => String(value).padStart(2, '0')).join(':');
}
function nextExercise(session: Session) {
  const next = (id: string) => { const item = session.exercises[id]!; return !item.skipped && item.sets.some(set => set.recordedAt === undefined); };
  return session.order.find((id, index) => index > session.order.indexOf(session.activeExerciseId) && next(id)) ?? session.order.find(next);
}
function finish(adapter: TrainingSessionAdapter) {
  if (!adapter.session) return;
  adapter.navigation.openPanel('session-finish');
}
function ValueField({ label, value, disabled, integer = false, optional = false, onChange }: { label: string; value: number | undefined; disabled: boolean; integer?: boolean; optional?: boolean; onChange: (value: number | undefined) => void }) {
  const display = (number: number | undefined) => number === undefined || !Number.isFinite(number) ? '' : String(number);
  const parse = (text: string) => !text.trim() ? optional ? undefined : Number.NaN : Number(text.replace(',', '.'));
  const [text, setText] = useState(() => display(value));
  useEffect(() => { setText(previous => Object.is(parse(previous), value) ? previous : display(value)); }, [value, optional]);
  const numeric = parse(text);
  const invalid = numeric === undefined ? !optional : !Number.isFinite(numeric) || (optional ? numeric < 0 : numeric <= 0) || (integer && !Number.isInteger(numeric));
  return <label className="session-core__field"><span>{label}</span><input inputMode={integer ? 'numeric' : 'decimal'} autoComplete="off" disabled={disabled}
    value={text} aria-invalid={invalid || undefined} onChange={event => { setText(event.target.value); onChange(parse(event.target.value)); }}/></label>;
}
export function TrainingSession({ adapter }: { adapter: TrainingSessionAdapter }) {
  const { session, now, send, navigation } = adapter;
  if (!session) return null;
  if (session.status === 'finished' || session.status === 'discarded') return <SessionSummary session={session}/>;
  const item = session.exercises[session.activeExerciseId]!, index = session.order.indexOf(item.id);
  const set = item.sets.find(entry => entry.id === item.selectedSetId)!;
  const readOnly = session.status !== 'running' || item.skipped || set.recordedAt !== undefined;
  const update = (patch: ExecutionValues) => send({ type: 'session/input', exerciseId: item.id, setId: set.id, values: { ...set.values, ...patch } });
  return <section className="session-core" aria-label="Sessão de treino" data-session-id={session.id} data-workout-id={session.prescription.workoutId} data-revision={session.prescription.revision} data-session-status={session.status}>
    <div className="session-core__title"><h1 tabIndex={-1}>{item.name}</h1><button type="button" aria-label="Mapa do treino" onClick={event => navigation.openPanel('session-map', event.currentTarget)}><ListOrdered size={23}/></button></div>
    <nav className="session-core__navigation" aria-label="Exercícios da sessão">
      <button type="button" aria-label="Exercício anterior" disabled={index === 0} onClick={() => send({ type: 'session/select', exerciseId: session.order[index - 1]! })}><ChevronLeft size={22}/></button>
      <div className="session-core__sets" role="group" aria-label="Séries prescritas">{item.sets.map((entry, i) => <button key={entry.id} type="button" aria-label={`Série ${i + 1}${entry.recordedAt !== undefined ? ', realizada' : ''}`} aria-pressed={entry.id === set.id} data-recorded={entry.recordedAt !== undefined} onClick={() => send({ type: 'session/set-select', exerciseId: item.id, setId: entry.id })}><span aria-hidden="true"/></button>)}</div>
      <button type="button" aria-label="Próximo exercício" disabled={index === session.order.length - 1} onClick={() => send({ type: 'session/select', exerciseId: session.order[index + 1]! })}><ChevronRight size={22}/></button>
    </nav>
    <SessionStage adapter={adapter}/>
    <div className="session-core__metrics"><div className="session-core__elapsed"><span>Sessão</span><output aria-label="Tempo ativo" data-active-ms={Math.floor(sessionActiveMs(session, now))}>{sessionClock(sessionActiveMs(session, now))}</output></div>
      <ValueField label="Carga realizada (kg)" optional value={set.values.loadKg} disabled={readOnly} onChange={value => { const { loadKg: _load, ...withoutLoad } = set.values; send({ type: 'session/input', exerciseId: item.id, setId: set.id, values: value === undefined ? withoutLoad : { ...set.values, loadKg: value } }); }}/>
      {item.prescribed.measurement === 'time' ? <ValueField label="Tempo realizado (s)" value={set.values.durationSeconds} disabled={readOnly} onChange={value => update({ durationSeconds: value ?? Number.NaN })}/> : item.prescribed.measurement === 'distance' ? <ValueField label="Distância realizada (m)" value={set.values.distanceMeters} disabled={readOnly} onChange={value => update({ distanceMeters: value ?? Number.NaN })}/> : <ValueField label="Repetições realizadas" integer value={set.values.repetitions} disabled={readOnly} onChange={value => update({ repetitions: value ?? Number.NaN })}/>}
    </div>
    {item.skipped && <p role="status">Exercício pulado.</p>}
    {session.status === 'paused' && <p role="status">Pausada</p>}
    {!validExecution(item, set.values) && <p role="status">Revise os valores realizados antes de concluir a série.</p>}
  </section>;
}
function SessionStage({ adapter }: { adapter: TrainingSessionAdapter }) {
  const { session, send, now } = adapter;
  const pointer = useRef<{ x: number; y: number } | null>(null);
  if (!session) return null;
  const showRest = Boolean(session.rest), index = session.order.indexOf(session.activeExerciseId);
  return <div className="session-core__stage" data-stage={showRest ? 'rest' : 'media'} onPointerDown={event => { pointer.current = { x: event.clientX, y: event.clientY }; }} onPointerCancel={() => { pointer.current = null; }} onPointerUp={event => {
    if (!pointer.current) return; const dx = event.clientX - pointer.current.x, dy = event.clientY - pointer.current.y; pointer.current = null;
    const next = session.order[index + (dx < 0 ? 1 : -1)];
    if (next && Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.3) send({ type: 'session/select', exerciseId: next });
  }}>
    {showRest ? <><span>Descanso</span><output aria-label="Tempo de descanso">{sessionClock(restRemainingMs(session, now), 'ceil')}</output></> : <span>Mídia indisponível</span>}
  </div>;
}
export function SessionFooter({ adapter }: { adapter: TrainingSessionAdapter }) {
  const { session, send, navigation } = adapter;
  const result = selectSessionResult(useDemoState(), session?.id ?? '');
  if (!session) return null;
  if (!['running','resting','paused','prepared'].includes(session.status)) return <div className="session-core__footer session-core__footer--result"><button type="button" onClick={adapter.leave}>Voltar à origem</button><NavLink location={{ page: { destination: 'history' }, panel: null }}>Histórico</NavLink>{result && <NavLink location={{ page: { destination: 'session-result', sessionId: result.sessionId }, panel: null }}>Ver resultado</NavLink>}</div>;
  const item = session.exercises[session.activeExerciseId]!, set = item.sets.find(entry => entry.id === item.selectedSetId)!;
  const nextSet = item.sets.find(entry => entry.recordedAt === undefined), next = nextExercise(session);
  let label: string, action: () => void, disabled = false;
  if (session.status === 'paused') { label = 'Retomar'; action = () => send({ type: 'session/resume' }); }
  else if (session.status === 'prepared') { label = 'Começar'; action = () => send({ type: 'session/start' }); }
  else if (session.status === 'resting') { label = 'Pular descanso'; action = () => send({ type: 'session/rest-skip' }); }
  else if (!item.skipped && set.recordedAt === undefined) { label = 'Concluir série'; disabled = !validExecution(item, set.values); action = () => send({ type: 'session/record', exerciseId: item.id, setId: set.id }); }
  else if (!item.skipped && nextSet) { label = 'Próxima série'; action = () => send({ type: 'session/set-select', exerciseId: item.id, setId: nextSet.id }); }
  else if (next) { label = 'Próximo exercício'; action = () => send({ type: 'session/select', exerciseId: next }); }
  else { label = 'Finalizar'; action = () => finish(adapter); }
  return <div className="session-core__footer"><button type="button" disabled={disabled} onClick={event => { if (event.detail <= 1) action(); }}>{label}</button><button type="button" aria-label="Mais opções do treino" onClick={event => navigation.openPanel('session-options', event.currentTarget)}><MoreHorizontal size={24}/></button></div>;
}
function SessionSummary({ session }: { session: Session }) {
  const result = selectSessionResult(useDemoState(), session.id);
  const summary = sessionSummary(session);
  if (session.status === 'finished' && !result) return <section className="session-core"><h1 tabIndex={-1}>Resultado indisponível</h1></section>;
  return <section className="session-core session-core__summary" data-session-status={session.status} data-session-id={session.id}>
    <h1 tabIndex={-1}>{session.status === 'discarded' ? 'Sessão descartada' : 'Resumo da sessão'}</h1><h2>{session.workoutName}</h2>
    <p>Resumo transitório em memória.</p>{result ? <><RecordedFacts result={result}/><RecordedExercises result={result}/></> : <>
<dl><dt>Tempo ativo</dt><dd>{sessionClock(session.activeMs)}</dd><dt>Séries realizadas</dt><dd>{summary.sets.length}</dd><dt>Exercícios com séries realizadas</dt><dd>{summary.performedExercises.length}</dd><dt>Exercícios pulados</dt><dd>{summary.skippedExercises.length}</dd></dl>
    {summary.performedExercises.map(item => <article key={item.id}><h3>{item.name}</h3><ul>{item.sets.filter(set => set.recordedAt !== undefined).map(set => <li key={set.id}>Série {set.index + 1}: {set.values.repetitions !== undefined ? `${set.values.repetitions} repetições` : set.values.durationSeconds !== undefined ? `${set.values.durationSeconds} s` : `${set.values.distanceMeters} m`}{set.values.loadKg !== undefined ? ` · ${set.values.loadKg} kg` : ''}</li>)}</ul></article>)}</>}

  </section>;
}
function SessionMap({ adapter }: { adapter: TrainingSessionAdapter }) {
  const [options, setOptions] = useState(false), [reordering, setReordering] = useState(false);
  const { session, send, navigation } = adapter;
  if (!session) return null;
  const move = (index: number, offset: number) => {
    const ids = [...session.order], target = index + offset;
    if (target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target]!, ids[index]!]; send({ type: 'session/reorder', ids });
  };
  return <div className="session-core__dialog"><button type="button" aria-label="Opções do mapa" aria-expanded={options} onClick={() => setOptions(!options)}><MoreHorizontal size={22}/></button>
    {options && <button type="button" onClick={() => { setReordering(!reordering); setOptions(false); }}>{reordering ? 'Concluir ordem' : 'Reordenar'}</button>}
    <ol className="session-core__map">{session.order.map((id, index) => <li key={id}><button type="button" aria-current={id === session.activeExerciseId ? 'true' : undefined} onClick={() => { send({ type: 'session/select', exerciseId: id }); navigation.closePanel(); }}>{session.exercises[id]!.name}</button>
      {reordering && <div><button type="button" aria-label={`Mover ${session.exercises[id]!.name} para cima`} disabled={index === 0} onClick={() => move(index, -1)}>Subir</button><button type="button" aria-label={`Mover ${session.exercises[id]!.name} para baixo`} disabled={index === session.order.length - 1} onClick={() => move(index, 1)}>Descer</button></div>}
    </li>)}</ol></div>;
}
function SessionHelp({ session }: { session: Session }) {
  const item = session.exercises[session.activeExerciseId]!, prescription = item.prescribed;
  return <><p>Valores iniciais vêm da prescrição. Somente Concluir série registra a execução. Pausar congela o tempo ativo e o descanso neste protótipo. Dados existem apenas em memória.</p>
    <p>Prescrição: revisão {session.prescription.revision}.</p><h3>{item.name}</h3><dl>
      <dt>Séries prescritas</dt><dd>{prescription.sets}</dd>
      {prescription.measurement === 'time' ? <><dt>Tempo prescrito</dt><dd>{prescription.durationSeconds} s</dd></> : prescription.measurement === 'distance' ? <><dt>Distância prescrita</dt><dd>{prescription.distanceMeters} m</dd></> : <><dt>Repetições prescritas</dt><dd>{prescription.repsMin}–{prescription.repsMax}</dd></>}
      {prescription.loadKg !== undefined && <><dt>Carga prescrita</dt><dd>{prescription.loadKg} kg</dd></>}
      <dt>Descanso prescrito</dt><dd>{sessionClock(prescription.restSeconds * 1000)}</dd>
    </dl></>;
}
export function resolveSessionOverlay(adapter: TrainingSessionAdapter, panel: SessionPanel): ContextualOverlay | undefined {
  const { session, active, navigation, send } = adapter;
  const close = () => navigation.closePanel();
  if (panel === 'session-conflict' && active) return { title: 'Treino em andamento', description: 'A sessão atual será preservada.', presentation: 'modal', content: <div className="session-core__dialog"><button type="button" onClick={adapter.resumeActive}>Retomar treino atual</button><button type="button" onClick={close}>Continuar aqui</button></div> };
  if (!session || !['prepared','running','resting','paused'].includes(session.status)) return undefined;
  if (panel === 'session-help') return { title: 'Ajuda da sessão', description: 'Prescrição e execução são independentes.', presentation: 'modal', content: <div className="session-core__dialog"><SessionHelp session={session}/><button type="button" onClick={close}>Fechar</button></div> };
  if (panel === 'session-map') return { title: 'Mapa do treino', description: 'A ordem altera somente esta execução.', presentation: 'sheet', content: <SessionMap adapter={adapter}/> };
  if (panel === 'session-options') return { title: 'Opções', description: 'Sessão de treino', presentation: 'sheet', content: <div className="session-core__dialog">
    <button type="button" onClick={() => { send({ type: session.status === 'paused' ? 'session/resume' : 'session/pause' }); close(); }}>{session.status === 'paused' ? 'Retomar' : 'Pausar'}</button>
    <button type="button" disabled={session.status !== 'running' || session.exercises[session.activeExerciseId]!.sets.every(set => set.recordedAt !== undefined)} onClick={() => { send({ type: 'session/skip', exerciseId: session.activeExerciseId }); close(); }}>Pular</button>
    <button type="button" disabled title="Substituição de sessão ainda indisponível">Substituir</button>
    <button type="button" onClick={() => { navigation.openPanel('session-finish', undefined, true); }}>Finalizar</button>
    <button type="button" className="session-core__exit" onClick={adapter.leave}>Sair</button><button type="button" onClick={() => navigation.openPanel('session-discard', undefined, true)}>Descartar sessão</button>
  </div> };
  if (panel === 'session-finish' || panel === 'session-discard') return { title: panel === 'session-finish' ? 'Finalizar sessão?' : 'Descartar sessão?', description: panel === 'session-finish' ? sessionSummary(session).complete ? 'Todas as séries foram registradas.' : sessionSummary(session).sets.length ? 'Há séries pendentes. Somente os registros realizados serão incluídos.' : 'Nenhuma série foi registrada.' : 'A sessão não poderá ser retomada. A prescrição salva será preservada.', presentation: 'modal', content: <div className="session-core__dialog"><button type="button" onClick={() => { send({ type: panel === 'session-finish' ? 'session/finish' : 'session/discard', confirmed: true }); close(); }}>{panel === 'session-finish' ? 'Confirmar finalização' : 'Confirmar descarte'}</button><button type="button" onClick={close}>Continuar sessão</button></div> };
  return undefined;
}
