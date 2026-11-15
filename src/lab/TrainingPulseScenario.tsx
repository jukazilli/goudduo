import { useRef, useState } from 'react';
import { TrainingPulseStrip } from '../surfaces/home/TrainingPulse';
import { trainingPulseIdentities, type DemonstrationPulseIdentity, type PulseViewState } from '../surfaces/home/pulse-presentation';
import { useDemoState } from '../state/DemoProvider';
/** Isolated presentation fixtures; never published as common-app social records. */
export function TrainingPulseScenario() {
  const { user } = useDemoState();
  const [scenario, setScenario] = useState('multiple');
  const memory = useRef(0);
  const examples: DemonstrationPulseIdentity[] = (['unknown', 'seen', 'unseen', 'unknown', 'unknown', 'unknown'] as PulseViewState[]).map((viewState, index) => ({
    id: `technical-pulse-${index}`, displayName: `Identidade ${index + 1} — demonstração`, scope: 'demonstration', viewState,
  }));
  const all = trainingPulseIdentities(user, examples);
  const items = scenario === 'empty' ? [] : scenario === 'one' ? all.slice(0, 1) : scenario === 'unknown' ? all.slice(0, 2) : all;
  return <section data-testid="pulse-technical-scenario" style={{ background: 'white', color: '#10202b' }}>
    <label className="foundation-field">Cenário de Pulse<select aria-label="Cenário de Pulse" value={scenario} onChange={event => setScenario(event.target.value)}>
      <option value="multiple">Múltiplas identidades sintéticas</option><option value="unknown">Sem conteúdo social (duas identidades)</option><option value="one">Uma identidade</option><option value="empty">Nenhuma identidade</option>
    </select></label>
    <p>Apresentação técnica P2-B7. Nenhum conteúdo ou serviço social; gradiente não visto pendente.</p>
    <TrainingPulseStrip items={items} scrollMemory={memory}/>
  </section>;
}
