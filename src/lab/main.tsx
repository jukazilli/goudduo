import { RoutineAdapterScenario } from './RoutineAdapterScenario';
import { EditorDraftTools } from './EditorDraftTools';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { PrototypeApp } from '../app/PrototypeApp';
import { BrowserNavigation, pagePath, parseLocation, type Page } from '../app/navigation';
import { NavigationProvider, useNavigation } from '../app/NavigationProvider';
import { DemoProvider, useDemoDispatch, useDemoState } from '../state/DemoProvider';
import { selectWorkoutForDay } from '../state/model';
import { Button, TextInput } from '../components/primitives';
import '../styles/app.css';
import './lab.css';
const scenarios: readonly Page[] = [
  { destination: 'home', context: 'treinos' }, { destination: 'home', context: 'publicacoes' }, { destination: 'home', context: 'business' },
  { destination: 'rotinas' }, { destination: 'match' }, { destination: 'mensagens' }, { destination: 'perfil' },
  ...(['splash', 'login', 'cadastro', 'otp', 'recuperacao', 'termos', 'privacidade'] as const).map(step => ({ destination: 'access' as const, step })),
  { destination: 'onboarding' }, { destination: 'routine', routineId: 'demo-routine' }, { destination: 'editor', workoutId: 'demo-workout' },
  { destination: 'session', sessionId: 'demo-session' }, { destination: 'history' }, { destination: 'profile-visited', userId: 'demo-other' },
  { destination: 'profile-edit' }, { destination: 'interests' }, { destination: 'settings' }, { destination: 'pulse-viewer', pulseId: 'demo-pulse' },
];
function LabApp() {
  const state = useDemoState(), dispatch = useDemoDispatch();
  const { navigation, location } = useNavigation();
  const [width, setWidth] = useState('390');
  const [stress, setStress] = useState(false);
  const [routineAdapters, setRoutineAdapters] = useState(false);
  const workout = selectWorkoutForDay(state, 'demo-routine', 'mon');
  return <div className="lab-root" data-foundation>
    <aside className="lab-inspector" aria-label="Inspetor do Visual Lab">
      <h1>Visual Lab · P1</h1><p>Dados sintéticos em memória. Superfícies finais ainda não integradas.</p>
      <label className="foundation-field">Viewport<select aria-label="Viewport" value={width} onChange={e => setWidth(e.target.value)}>{['320','375','390','414','430'].map(w => <option key={w} value={w}>{w} px</option>)}</select></label>
      <label className="foundation-field">Superfície<select aria-label="Superfície" value={pagePath(location.page)} onChange={event => {
        navigation.navigate({ page: parseLocation(new URL(event.target.value, window.location.origin)).page, panel: null });
      }}><option value="/nao-encontrado" disabled>Rota indisponível</option>{scenarios.map(page => <option key={pagePath(page)} value={pagePath(page)}>{pagePath(page)}</option>)}</select></label>
      <TextInput id="scenario-name" label="Nome sintético do cenário" maxLength={60} value={state.user.displayName} onChange={event => dispatch({ type: 'user/name', name: event.target.value })}/>
      <p>Treino compartilhado: <output data-testid="shared-workout">{workout?.name} · revisão {workout?.revision}</output></p>
      <Button onClick={() => { if (workout) dispatch({ type: 'workout/commit', routineId: 'demo-routine', day: 'mon', workout: { ...workout, revision: workout.revision + 1, name: `Cenário ${workout.revision + 1}` } }); }}>Alterar treino sintético</Button>
      <Button onClick={() => navigation.openPanel('create')}>Testar bottom sheet</Button>
      <Button onClick={() => navigation.openPanel('activity')}>Testar modal</Button>
      <label className="lab-check"><input type="checkbox" checked={stress} onChange={event => setStress(event.target.checked)}/>Cenário longo de scroll</label>
      <label className="lab-check"><input type="checkbox" checked={routineAdapters} onChange={event => setRoutineAdapters(event.target.checked)}/>Cenário técnico de adapters</label>
      <label className="foundation-field">Cenário de Rotinas<select aria-label="Cenário de Rotinas" value={Object.keys(state.routines).length === 0 ? 'none' : Object.keys(state.routines).length === 1 ? 'one' : 'multiple'} onChange={event => dispatch({ type: 'scenario/routines', scenario: event.target.value as 'none' | 'one' | 'multiple' })}>
        <option value="multiple">Várias rotinas</option><option value="one">Uma rotina</option><option value="none">Sem rotinas</option>
      </select></label>
      <Button onClick={() => dispatch({ type: 'scenario/reset' })}>Reiniciar cenário</Button>
      <EditorDraftTools/>
      <p role="status">Perfil profissional: {state.user.professional}. Nenhum serviço real é ativado.</p>
    </aside>
    <div className="lab-frame" style={{ maxWidth: `${width}px` }}>
      {routineAdapters ? <RoutineAdapterScenario/> : <PrototypeApp contentExtension={stress ? <section aria-label="Conteúdo longo de teste">{Array.from({ length: 30 }, (_, i) => <p key={i}>Linha sintética de scroll {i + 1}</p>)}</section> : undefined}/>}
    </div>
  </div>;
}
const root = document.getElementById('root');
if (!root) throw new Error('Entrada do Lab ausente');
const navigation = new BrowserNavigation(window);
createRoot(root).render(<StrictMode><DemoProvider><NavigationProvider navigation={navigation}><LabApp/></NavigationProvider></DemoProvider></StrictMode>);
if (import.meta.hot) import.meta.hot.dispose(() => navigation.dispose());
