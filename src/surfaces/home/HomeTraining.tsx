import { useEffect, useLayoutEffect, useRef, type PointerEvent } from 'react';
import { BookOpen, Flame, Images, Medal, Ruler, Weight, Trophy, X } from 'lucide-react';
import { useDemoDispatch, useDemoState } from '../../state/DemoProvider';
import { selectHomeTraining } from '../../state/selectors';
import { homeBentoLayout, type HomeWidget } from './layout';
import { selectHeroChoices, trainingDayNames } from './training-data';
import './home-training.css';
const widgets = {
  ranking: { label: 'Ranking', icon: Trophy, value: 'Sem ranking' },
  status: { label: 'Status', icon: Flame, value: 'Sem feedback' },
  weight: { label: 'Peso', icon: Weight, value: 'Sem registros' },
  measures: { label: 'Medidas', icon: Ruler, value: 'Sem registros' },
  library: { label: 'Biblioteca', icon: BookOpen, value: 'Exercícios' },
  photos: { label: 'Fotos', icon: Images, value: 'Sem registros' },
  records: { label: 'Recordes', icon: Medal, value: 'Sem registros' },
  consistency: { label: 'Consistência', icon: Flame, value: 'Sem registros' },
} as const;
/** Empty integration region only: no avatars, social states or interactive Pulse. */
export function TrainingPulseRegion() { return <div className="home-training-v53__pulse-slot" data-testid="training-pulse-slot" aria-hidden="true"/>; }
export function HomeTraining({ expanded, onExpand, onOpenRoutines }: {
  expanded: HomeWidget | null; onExpand: (id: HomeWidget | null) => void; onOpenRoutines: () => void;
}) {
  const cards = useRef(new Map<string, HTMLElement>()), before = useRef(new Map<string, DOMRect>());
  const animations = useRef<Animation[]>([]);
  const previous = useRef(expanded);
  const layout = homeBentoLayout(expanded);
  useLayoutEffect(() => {
    animations.current.forEach(animation => animation.cancel()); animations.current = [];
    const origins = before.current; before.current = new Map();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (const [id, node] of cards.current) {
        const origin = origins.get(id); if (!origin || !node.animate) continue;
        const target = node.getBoundingClientRect(), x = origin.x - target.x, y = origin.y - target.y;
        if (Math.abs(x) + Math.abs(y) > 2) animations.current.push(node.animate([
          { transform: `translate(${x}px,${y}px)` }, { transform: 'translate(0,0)' },
        ], { duration: 400, easing: 'cubic-bezier(.22,1,.36,1)' }));
      }
    }
  }, [expanded]);
  useEffect(() => () => animations.current.forEach(animation => animation.cancel()), []);
  useEffect(() => {
    const changed = previous.current !== expanded; previous.current = expanded;
    if (!changed || !expanded) return;
    const timer = window.setTimeout(() => {
      const card = cards.current.get(expanded), main = card?.closest<HTMLElement>('.app-content');
      if (!card || !main) return;
      const box = card.getBoundingClientRect(), area = main.getBoundingClientRect();
      if (box.top < area.top || box.bottom > area.bottom) main.scrollTo?.({ top: Math.max(0, main.scrollTop + box.top - area.top - 14), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 410);
    return () => clearTimeout(timer);
  }, [expanded]);
  const expand = (id: HomeWidget | null) => {
    before.current = new Map([...cards.current].map(([key, node]) => [key, node.getBoundingClientRect()]));
    const closing = expanded; onExpand(id);
    if (!id && closing) cards.current.get(closing)?.querySelector<HTMLButtonElement>('[aria-expanded]')?.focus({ preventScroll: true });
  };
  return <section className="home-training-v53" aria-label="Home Treinos" data-testid="home-training" onKeyDown={event => {
    if (event.key === 'Escape' && expanded) { event.stopPropagation(); expand(null); }
  }}>
    <h1 className="home-training-v53__sr" tabIndex={-1}>Treinos</h1>
    <div className="home-training-v53__grid" data-expansion={layout.mode ?? undefined}>{layout.ids.map(id => id === 'workout' ?
      <div key={id} className="home-training-v53__hero-cell" data-home-card={id} ref={node => { if (node) cards.current.set(id, node); else cards.current.delete(id); }}><TrainingHero onOpenRoutines={onOpenRoutines}/></div> : (() => {
        const widget = widgets[id], Icon = widget.icon, open = expanded === id;
        return <article key={id} ref={node => { if (node) cards.current.set(id, node); else cards.current.delete(id); }} data-home-card={id}
          className={`home-training-v53__widget ${open ? 'is-expanded' : ''} ${layout.orphan === id ? 'is-orphan' : ''}`}>
          <div className="home-training-v53__card-top">
            <button type="button" className="home-training-v53__toggle" aria-label={`${open ? 'Recolher' : 'Expandir'} ${widget.label}`} aria-expanded={open} aria-controls={`home-widget-${id}`} onClick={() => expand(open ? null : id)}>
              <span className="home-training-v53__widget-head"><span>{widget.label}</span><span className="home-training-v53__icon"><Icon size={18} strokeWidth={1.8} aria-hidden="true"/></span></span>
              <span className="home-training-v53__value">{widget.value}</span>
            </button>
            {open && <button type="button" className="home-training-v53__close" aria-label={`Fechar ${widget.label}`} onClick={() => expand(null)}><X size={18} aria-hidden="true"/></button>}
          </div>
          <div className="home-training-v53__reveal" id={`home-widget-${id}`} inert={!open} aria-hidden={!open}><div><div className="home-training-v53__inside">
            <h2>{id === 'status' ? 'Em construção' : widget.label}</h2>
            <p>Ainda não disponível.</p>
          </div></div></div>
        </article>;
      })())}</div>
  </section>;
}
function TrainingHero({ onOpenRoutines }: { onOpenRoutines: () => void }) {
  const state = useDemoState(), dispatch = useDemoDispatch();
  const training = selectHomeTraining(state), choices = selectHeroChoices(state);
  const pointer = useRef<{ x: number; y: number; id: number } | null>(null);
  const swipeStart = (event: PointerEvent<HTMLElement>) => {
    if (!(event.target instanceof Element) || event.target.closest('button,a,input') || !event.isPrimary) return;
    pointer.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  };
  return <article className="home-training-v53__hero" aria-labelledby="home-training-title" data-workout-id={training.workout?.id} data-revision={training.workout?.revision}
    data-routine-id={training.routine?.id} data-day={training.selection?.day} onPointerDown={swipeStart} onPointerCancel={() => { pointer.current = null; }} onPointerUp={event => {
      const start = pointer.current; pointer.current = null;
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x, dy = event.clientY - start.y;
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.3 || choices.length < 2) return;
      const index = choices.findIndex(choice => choice.day === training.selection?.day);
      const next = choices[(index + (dx < 0 ? 1 : choices.length - 1) + choices.length) % choices.length];
      if (next) dispatch({ type: 'training/select', routineId: next.routineId, day: next.day });
    }}>
    <div className="home-training-v53__eyebrow">Treino do Dia</div>
    <h2 id="home-training-title">{training.status === 'ready' ? training.name : 'Sem treino'}</h2>
    <p>{training.routine?.name}{training.selection ? ` · ${trainingDayNames[training.selection.day]}` : ''}</p>
    {training.status === 'ready' && <p>{training.exerciseCount} {training.exerciseCount === 1 ? 'exercício' : 'exercícios'}</p>}
    <div className="home-training-v53__hero-bottom">
      <button type="button" className="home-training-v53__cta" onClick={onOpenRoutines}>{training.status === 'ready' ? 'Ver treino' : 'Organizar treinos'}</button>
      {choices.length > 1 && <div className="home-training-v53__dots" role="group" aria-label="Selecionar treino">{choices.map(choice => <button key={choice.workout.id} type="button" aria-label={`Selecionar treino de ${trainingDayNames[choice.day]}`} aria-pressed={choice.day === training.selection?.day} onClick={() => dispatch({ type: 'training/select', routineId: choice.routineId, day: choice.day })}><span/></button>)}</div>}
    </div>
  </article>;
}
