import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AppShell } from '../app/AppShell';
import { BrowserNavigation } from '../app/navigation';
import { NavigationProvider, useNavigation } from '../app/NavigationProvider';
import { DemoProvider, useDemoDispatch, useDemoState } from '../state/DemoProvider';
import { selectWorkoutForDay } from '../state/model';
import { Button, TextInput } from '../components/primitives';
import '../styles/app.css';
import './lab.css';
function LabApp() {
  const state = useDemoState(), dispatch = useDemoDispatch();
  const { navigation, location } = useNavigation();
  const [width, setWidth] = useState('390');
  const [stress, setStress] = useState(false);
  const workout = selectWorkoutForDay(state, 'demo-routine', 'mon');
  return <div className="lab-root">
    <aside className="lab-inspector" aria-label="Inspetor do Visual Lab">
      <h1>Visual Lab · P1</h1><p>Dados sintéticos em memória. Superfícies finais ainda não integradas.</p>
      <label className="field">Viewport<select aria-label="Viewport" value={width} onChange={e => setWidth(e.target.value)}>{['320','375','390','414','430'].map(w => <option key={w} value={w}>{w} px</option>)}</select></label>
      <label className="field">Superfície<select aria-label="Superfície" value={location.page.destination === 'home' ? location.page.context : location.page.destination === 'not-found' ? '' : location.page.destination} onChange={event => {
        const value = event.target.value;
        if (value === 'treinos' || value === 'publicacoes' || value === 'business') navigation.navigate({ page: { destination: 'home', context: value }, panel: null });
        else if (value === 'rotinas' || value === 'match' || value === 'mensagens' || value === 'perfil') navigation.navigate({ page: { destination: value }, panel: null });
      }}><option value="" disabled>Rota indisponível</option>{['treinos','publicacoes','business','rotinas','match','mensagens','perfil'].map(s => <option key={s}>{s}</option>)}</select></label>
      <TextInput id="scenario-name" label="Nome sintético do cenário" maxLength={60} value={state.user.displayName} onChange={event => dispatch({ type: 'user/name', name: event.target.value })}/>
      <p>Treino compartilhado: <output data-testid="shared-workout">{workout?.name} · revisão {workout?.revision}</output></p>
      <Button onClick={() => { if (workout) dispatch({ type: 'workout/commit', routineId: 'demo-routine', day: 'mon', workout: { ...workout, revision: workout.revision + 1, name: `Cenário ${workout.revision + 1}` } }); }}>Alterar treino sintético</Button>
      <Button onClick={() => navigation.openPanel('create')}>Testar bottom sheet</Button>
      <Button onClick={() => navigation.openPanel('activity')}>Testar modal</Button>
      <label className="lab-check"><input type="checkbox" checked={stress} onChange={event => setStress(event.target.checked)}/>Cenário longo de scroll</label>
      <Button onClick={() => dispatch({ type: 'scenario/reset' })}>Reiniciar cenário</Button>
      <p role="status">Perfil profissional: {state.user.professional}. Nenhum serviço real é ativado.</p>
    </aside>
    <div className="lab-frame" style={{ maxWidth: `${width}px` }}>
      <AppShell contentExtension={stress ? <section aria-label="Conteúdo longo de teste">{Array.from({ length: 30 }, (_, i) => <p key={i}>Linha sintética de scroll {i + 1}</p>)}</section> : undefined}/>
    </div>
  </div>;
}
const root = document.getElementById('root');
if (!root) throw new Error('Entrada do Lab ausente');
const navigation = new BrowserNavigation(window);
createRoot(root).render(<StrictMode><DemoProvider><NavigationProvider navigation={navigation}><LabApp/></NavigationProvider></DemoProvider></StrictMode>);
if (import.meta.hot) import.meta.hot.dispose(() => navigation.dispose());
