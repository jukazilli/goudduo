import { useEffect, useLayoutEffect, useRef, type KeyboardEvent } from 'react';
import { Dumbbell, MoreHorizontal } from 'lucide-react';
import type { Weekday } from '../../domain/training';
import { useDemoDispatch, useDemoState } from '../../state/DemoProvider';
import { selectWorkoutForDay } from '../../state/model';
import { readEntity, validatePrescription } from '../../state/training';
import { routinesLayout } from './layout';
import './routines.css';
const days = [ ['mon', 'Seg'], ['tue', 'Ter'], ['wed', 'Qua'], ['thu', 'Qui'], ['fri', 'Sex'], ['sat', 'Sáb'], ['sun', 'Dom'] ] as const;
const tones: Record<string, string> = { Musculação: 'blue', Hipertrofia: 'mint', Funcional: 'peach', Corrida: 'lavender', Mobilidade: 'gray' };
export function RoutinesHome({ expandedId, onExpand, onOpenEditor }: {
  expandedId: string | null; onExpand: (id: string | null) => void;
  onOpenEditor: (routineId: string, day: Weekday, workoutId: string | undefined) => void;
}) {
  const state = useDemoState(), dispatch = useDemoDispatch();
  const cards = useRef(new Map<string, HTMLElement>());
  const beforeMotion = useRef(new Map<string, DOMRect>());
  const animations = useRef<Animation[]>([]);
  useLayoutEffect(() => {
    const before = beforeMotion.current; beforeMotion.current = new Map();
    animations.current.forEach(animation => animation.cancel()); animations.current = [];
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (const [id, node] of cards.current) {
      const origin = before.get(id); if (!origin || !node.animate) continue;
      const target = node.getBoundingClientRect(), x = origin.left - target.left, y = origin.top - target.top;
      if (Math.abs(x) + Math.abs(y) > 3) animations.current.push(node.animate([
        { transform: `translate(${x}px,${y}px)` }, { transform: 'translate(0,0)' },
      ], { duration: 340, easing: 'cubic-bezier(.22,1,.36,1)' }));
    }
  }, [expandedId]);
  useEffect(() => () => animations.current.forEach(animation => animation.cancel()), []);
  const layout = routinesLayout(Object.keys(state.routines), state.primaryRoutineId, expandedId);
  const previousExpanded = useRef(expandedId);
  useEffect(() => {
    const changed = previousExpanded.current !== expandedId; previousExpanded.current = expandedId;
    if (!expandedId || !changed) return;
    const align = () => {
      const card = cards.current.get(expandedId), main = card?.closest<HTMLElement>('.app-content');
      if (!card || !main) return;
      const box = card.getBoundingClientRect(), viewport = main.getBoundingClientRect();
      const top = viewport.top + 14, bottom = viewport.bottom - 42;
      if (box.top < top || box.bottom > bottom || box.top > bottom - 95) {
        const destination = Math.max(0, Math.min(main.scrollHeight - main.clientHeight, main.scrollTop + box.top - top));
        main.scrollTo?.({ top: destination, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    };
    const frame = requestAnimationFrame(align), timer = window.setTimeout(align, 380);
    return () => { cancelAnimationFrame(frame); clearTimeout(timer); };
  }, [expandedId]);
  const keyDay = (event: KeyboardEvent<HTMLElement>, routineId: string, day: Weekday) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = days.findIndex(([id]) => id === day);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 6 : (current + (event.key === 'ArrowRight' ? 1 : 6)) % 7;
    const id = days[next]![0];
    dispatch({ type: 'training/select', routineId, day: id });
    const button = event.currentTarget.querySelector<HTMLElement>(`[data-day="${id}"]`);
    button?.focus({ preventScroll: true }); button?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
  };
  return <section className="routines-v74" data-testid="routines-home" aria-label="Rotinas demonstrativas">
    <h1 className="routines-v74__sr-only" tabIndex={-1}>Rotinas</h1>
    {!layout.ids.length ? <section className="routines-v74__empty">
      <div className="routines-v74__empty-art"><Dumbbell size={42} aria-hidden="true"/></div>
      <h2>Suas rotinas começam aqui</h2><p>Crie uma rotina para organizar seus treinos.</p>
      <button type="button" disabled title="Ainda não disponível">Criar rotina</button>
    </section> : <div className="routines-v74__grid">{layout.ids.map((id, index) => {
      const routine = state.routines[id]!;
      const primary = id === layout.primaryId, expanded = id === expandedId;
      const day = state.selectedDayByRoutine[id] ?? 'mon';
      const candidate = selectWorkoutForDay(state, id, day);
      const workout = candidate && !validatePrescription(state, candidate.exercises) ? candidate : undefined;
      const count = days.filter(([value]) => { const saved = selectWorkoutForDay(state, id, value); return saved && !validatePrescription(state, saved.exercises); }).length;
      const muscles = workout ? [...new Set(workout.exercises.flatMap(item => readEntity(state.exercises, item.exerciseId)?.muscleGroupIds ?? []).map(group => readEntity(state.muscleGroups, group)?.name).filter(Boolean))] : [];
      const regionId = `routine-preview-${id}`;
      return <section key={id} ref={node => { if (node) cards.current.set(id, node); else cards.current.delete(id); }} data-routine-id={id} data-compact={index === 2 || index === 3 || undefined}
        className={`routines-v74__item ${primary ? 'is-primary' : ''} ${expanded ? 'is-expanded' : ''} ${id === layout.orphanId ? 'is-orphan' : ''}`}>
        <div className="routines-v74__cover" data-tone={tones[routine.modality ?? ''] ?? 'blue'}>
          <button type="button" className="routines-v74__toggle" aria-expanded={expanded} aria-controls={regionId}
            aria-label={`${expanded ? 'Recolher' : 'Expandir'} ${routine.name}`} onClick={event => {
              beforeMotion.current = new Map([...cards.current].map(([key, node]) => [key, node.getBoundingClientRect()]));
              onExpand(expanded ? null : id); event.currentTarget.focus({ preventScroll: true });
            }}>
            <span className="routines-v74__wash"/>
            {primary && <span className="routines-v74__principal">PRINCIPAL</span>}
            <span className="routines-v74__card-content"><span className="routines-v74__name">{routine.name}</span>
              <span className="routines-v74__meta">{routine.modality ? `${routine.modality} · ` : ''}{count} {count === 1 ? 'treino' : 'treinos'}</span></span>
          </button>
          {(primary || expanded) && <button type="button" className="routines-v74__options" disabled aria-label={`Opções de ${routine.name}, ainda indisponíveis`}><MoreHorizontal size={19} aria-hidden="true"/></button>}
        </div>
        <div className="routines-v74__expansion" inert={!expanded} aria-hidden={!expanded}>
          <div id={regionId} className="routines-v74__preview" role="region" aria-label={`Treinos de ${routine.name}`}>
            <div className="routines-v74__week" role="tablist" aria-label={`Semana de ${routine.name}`} onKeyDown={event => keyDay(event, id, day)}>
              {days.map(([value, label]) => {
                const saved = selectWorkoutForDay(state, id, value); const planned = Boolean(saved && !validatePrescription(state, saved.exercises));
                return <button key={value} type="button" role="tab" tabIndex={day === value ? 0 : -1} data-day={value} aria-selected={day === value}
                  aria-controls={`routine-day-${id}`} className={`${day === value ? 'is-chosen' : ''} ${planned ? 'is-planned' : ''}`}
                  aria-label={`${label}, ${planned ? 'com treino' : 'dia livre'}`} onClick={() => dispatch({ type: 'training/select', routineId: id, day: value })}>{label}<i aria-hidden="true"/></button>;
              })}
            </div>
            <div className="routines-v74__workout" id={`routine-day-${id}`} role="tabpanel" aria-label={`Treino de ${routine.name}`}>
              <span className="routines-v74__overline">{days.find(([value]) => value === day)![1].toUpperCase()} · {workout ? `${workout.exercises.length} ${workout.exercises.length === 1 ? 'EXERCÍCIO' : 'EXERCÍCIOS'}` : 'DIA LIVRE'}</span>
              <h2>{workout?.name ?? 'Sem treino'}</h2>
              {muscles.length > 0 && <p className="routines-v74__muscles">{muscles.join(' · ')}</p>}
              {workout ? <div className="routines-v74__exercises">{workout.exercises.slice(0, 2).map(item => <span key={item.id}>{state.exercises[item.exerciseId]!.name}</span>)}
                {workout.exercises.length > 2 && <small>+ {workout.exercises.length - 2} {workout.exercises.length === 3 ? 'exercício' : 'exercícios'}</small>}
              </div> : <p className="routines-v74__muscles">Você pode adicionar um treino a este dia.</p>}
              <button type="button" className="routines-v74__cta" onClick={() => onOpenEditor(id, day, workout?.id)}>{workout ? 'Ver treino' : 'Adicionar treino'}</button>
            </div>
          </div>
        </div>
      </section>;
    })}</div>}
  </section>;
}
