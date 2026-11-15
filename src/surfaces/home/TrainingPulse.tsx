import { useLayoutEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import wordmark from '../../../assets/brand/goudduo/goudduo-wordmark-white.svg';
import { useDemoState } from '../../state/DemoProvider';
import { pulseAccessibleName, pulseInitial, pulseRing, trainingPulseIdentities, type TrainingPulseIdentity } from './pulse-presentation';
import './training-pulse.css';
export interface PulseScrollMemory { current: number }
/** Common app derives identities only; there is no Pulse feed/content service in DemoState. */
export function TrainingPulseRegion({ scrollMemory }: { scrollMemory?: PulseScrollMemory }) {
  const { user } = useDemoState();
  return <TrainingPulseStrip items={trainingPulseIdentities(user)} {...(scrollMemory ? { scrollMemory } : {})}/>;
}
/** Same contextual renderer is exercised with explicit fixtures only in tests/isolated Lab. */
export function TrainingPulseStrip({ items, scrollMemory }: { items: readonly TrainingPulseIdentity[]; scrollMemory?: PulseScrollMemory }) {
  const viewport = useRef<HTMLUListElement>(null), localMemory = useRef(0);
  const memory = scrollMemory ?? localMemory;
  useLayoutEffect(() => { if (viewport.current) viewport.current.scrollLeft = memory.current; }, [memory]);
  return <div className="training-pulse-v53" data-testid="training-pulse-slot">
    <ul ref={viewport} className="training-pulse-v53__row" aria-label="Pulse da Home Treinos" role="list" tabIndex={items.length ? 0 : undefined}
      onScroll={event => { memory.current = event.currentTarget.scrollLeft; }}>
      {items.map(item => <li key={item.id} className="training-pulse-v53__item" data-pulse-id={item.id} data-kind={item.kind} data-view-state={item.viewState} data-ring={pulseRing(item.viewState)}>
        {item.kind === 'own' ? <button type="button" className="training-pulse-v53__avatar" disabled aria-label={pulseAccessibleName(item)}>
          <span aria-hidden="true">{pulseInitial(item.displayName)}</span><span className="training-pulse-v53__plus" aria-hidden="true"><Plus size={14} strokeWidth={2}/></span>
        </button> : <div className="training-pulse-v53__avatar" role="img" aria-label={pulseAccessibleName(item)}>
          {item.kind === 'institutional' ? <img src={wordmark} alt="" width="48" height="14"/> : <span aria-hidden="true">{pulseInitial(item.displayName)}</span>}
        </div>}
        <span className="training-pulse-v53__caption" aria-hidden="true">{item.kind === 'own' ? '\u00a0' : item.displayName}</span>
      </li>)}
    </ul>
  </div>;
}
