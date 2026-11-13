/** Isolated technical consumer. No final Editor, Library search, catalogue list or production UI. */
import { useRef, useState } from 'react';
import { AppShell } from '../app/AppShell';
import { useRoutineEditorAdapter, type RoutineOverlayContract } from '../app/useRoutineEditorAdapter';
import { useDemoDispatch, useDemoState } from '../state/DemoProvider';
import { Button, TextInput } from '../components/primitives';
function NamingConsumer({ contract }: { contract: RoutineOverlayContract }) {
  const [name, setName] = useState(contract.suggestedName);
  return <><TextInput id="technical-name" label="Nome técnico final" value={name} onChange={event => setName(event.target.value)}/>
    <p role="status">{contract.issue}</p><Button onClick={() => contract.submitName(name)}>Confirmar nome técnico</Button>
    <Button onClick={contract.continueEditing}>Continuar edição técnica</Button></>;
}
export function RoutineAdapterScenario() {
  const state = useDemoState(), dispatch = useDemoDispatch();
  const search = useRef<HTMLInputElement>(null);
  const adapter = useRoutineEditorAdapter({
    'routine-library': contract => ({ initialFocus: () => search.current, content: <>
      <TextInput ref={search} id="technical-field" label="Campo técnico de foco"/>
      <Button onClick={() => dispatch({ type: 'draft/add', draftId: contract.context.draftId, exercise: {
        id: 'technical-time-instance', exerciseId: 'demo-time', measurement: 'time', sets: 1, durationSeconds: 30, restSeconds: 0, equipmentId: null,
      } })}>Adicionar item sintético</Button>
      {Array.from({ length: 16 }, (_, index) => <p key={index}>Conteúdo técnico rolável {index + 1}</p>)}
      <Button onClick={contract.close}>Fechar consumidor técnico</Button>
    </> }),
    'routine-confirm-single': contract => ({ content: <>
      <Button onClick={contract.confirmSingle}>Confirmar exercício técnico único</Button>
      <Button onClick={contract.continueEditing}>Continuar edição técnica</Button>
    </> }),
    'routine-naming': contract => ({ content: <NamingConsumer contract={contract}/> }),
  });
  return <>
    <section className="lab-inspector" aria-label="Consumidor técnico P2-B2">
      <p>Consumidor técnico P2-B2; não é interface homologada.</p>
      <Button onClick={() => adapter.openEditor({ routineId: 'demo-routine', day: 'mon', workoutId: 'demo-workout', draftId: crypto.randomUUID() })}>Abrir Editor técnico</Button>
      <output data-testid="technical-draft">{adapter.context?.draftId ?? adapter.status}</output>
      <output data-testid="technical-stage">{adapter.draft?.stage} {adapter.issue}</output>
      <output data-testid="technical-count">{Object.keys(state.drafts).length}</output>
      <output data-testid="technical-revision">{state.workouts['demo-workout']?.revision}</output>
      {adapter.context && <><Button onClick={event => adapter.openLibrary(event.currentTarget)}>Abrir Biblioteca técnica</Button>
        <Button onClick={() => adapter.cancelEditing(false)}>Solicitar cancelamento técnico</Button>
        <Button onClick={() => adapter.cancelEditing(true)}>Confirmar descarte técnico</Button></>}
    </section>
    <AppShell integrations={{ resolveOverlay: adapter.resolveOverlay, resolve: page => page.destination === 'editor' && adapter.status === 'ready' ? {
      content: <section className="foundation-empty-state"><h1 tabIndex={-1}>Consumidor técnico do Editor</h1><p>Superfície final ainda não integrada.</p></section>,
      ...(adapter.header ? { header: adapter.header } : {}),
    } : undefined }}/>
  </>;
}
