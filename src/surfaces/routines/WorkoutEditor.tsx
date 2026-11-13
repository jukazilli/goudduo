import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus } from 'lucide-react';
import type { WorkoutExercise } from '../../domain/training';
import { useDemoDispatch, useDemoState } from '../../state/DemoProvider';
import type { DraftIssue, WorkoutDraft } from '../../state/training';
import { readEntity } from '../../state/training';
import { formatRest, parseNumeric, parseRest } from './editor-fields';
import './workout-editor.css';

export const draftIssueText: Record<DraftIssue, string> = {
  empty: 'Seu treino está vazio. Adicione exercícios para começar.',
  'invalid-prescription': 'Revise os parâmetros: séries inteiras positivas, repetições em ordem, valores válidos e descanso em HH:MM:SS.',
  'duplicate-exercise': 'Este exercício já está no treino.',
  'name-required': 'Informe um nome de até 100 caracteres.',
  'stale-revision': 'Este treino foi atualizado em outra edição. O rascunho foi preservado, mas não pode substituir a versão atual.',
  'binding-changed': 'O vínculo deste dia mudou. O rascunho foi preservado e o salvamento está bloqueado.',
  'shared-workout-pending': 'Este treino está vinculado a mais de um dia. A edição compartilhada ainda não está disponível.',
  'confirmation-required': 'Confirme o salvamento com um exercício.',
  'prepare-required': 'Prepare o treino antes de salvar.',
};

function PrescriptionField({ label, value, onChange, rest = false, optional = false, integer = false }: {
  label: string; value: number | undefined; onChange: (value: number | undefined) => void;
  rest?: boolean; optional?: boolean; integer?: boolean;
}) {
  const display = (next: number | undefined) => next === undefined || !Number.isFinite(next) ? '' : rest ? formatRest(next) : String(next);
  const parse = (text: string) => optional && !text.trim() ? undefined : rest ? parseRest(text) : parseNumeric(text);
  const [text, setText] = useState(() => display(value));
  // Only text editing is local. Every parsed value, including invalid intermediate values,
  // belongs to the existing draft; invalid/empty required fields cannot silently save old data.
  useEffect(() => { setText(previous => Object.is(parse(previous), value) ? previous : display(value)); }, [value, rest, optional]);
  const numeric = parse(text);
  const invalid = numeric === undefined ? !optional : !Number.isFinite(numeric);
  return <label className="workout-editor__field"><span>{label}</span><input value={text} onChange={event => {
    setText(event.target.value); onChange(parse(event.target.value));
  }} aria-invalid={invalid || undefined} inputMode={rest ? 'text' : integer ? 'numeric' : 'decimal'} autoComplete="off" spellCheck={false}/></label>;
}

function ExerciseCard({ item, draftId, index, count, onMove, onRemove }: {
  item: WorkoutExercise; draftId: string; index: number; count: number;
  onMove: (offset: number) => void; onRemove: () => void;
}) {
  const state = useDemoState(), dispatch = useDemoDispatch();
  const definition = readEntity(state.exercises, item.exerciseId);
  const update = (exercise: WorkoutExercise) => dispatch({ type: 'draft/update', draftId, exercise });
  const [options, setOptions] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return <>
    <div className="workout-editor__options">
      <button ref={menuButton} type="button" aria-label="Opções do exercício" aria-expanded={options} aria-controls={`exercise-options-${item.id}`} onClick={() => setOptions(!options)}><MoreHorizontal size={22}/></button>
      {options && <div id={`exercise-options-${item.id}`} className="workout-editor__menu" role="group" aria-label="Opções do exercício" onKeyDown={event => { if (event.key === 'Escape') { setOptions(false); menuButton.current?.focus(); } }}>
        <button type="button" disabled={index === 0} onClick={() => { onMove(-1); setOptions(false); menuButton.current?.focus(); }}>Mover para cima</button>
        <button type="button" disabled={index === count - 1} onClick={() => { onMove(1); setOptions(false); menuButton.current?.focus(); }}>Mover para baixo</button>
        <button type="button" onClick={onRemove}>Excluir exercício</button>
      </div>}
    </div>
    <article className="workout-editor__card" aria-labelledby={`exercise-title-${item.id}`}>
      <h2 id={`exercise-title-${item.id}`} tabIndex={-1}>{definition?.name ?? 'Exercício indisponível'}</h2>
      <p className="workout-editor__muscles">{definition?.muscleGroupIds?.map(id => readEntity(state.muscleGroups, id)?.name).filter(Boolean).join(' · ')}</p>
      <div className="workout-editor__media" aria-hidden="true"/>
      <div className="workout-editor__fields">
        <PrescriptionField label="Séries" integer value={item.sets} onChange={value => update({ ...item, sets: value ?? Number.NaN })}/>
        <PrescriptionField label="Carga (kg)" optional value={item.loadKg} onChange={value => {
          const { loadKg: _load, ...withoutLoad } = item;
          update(value === undefined ? withoutLoad : { ...item, loadKg: value });
        }}/>
        {item.measurement === 'time' ? <PrescriptionField label="Duração (s)" value={item.durationSeconds} onChange={value => update({ ...item, durationSeconds: value ?? Number.NaN })}/> :
          item.measurement === 'distance' ? <PrescriptionField label="Distância (m)" value={item.distanceMeters} onChange={value => update({ ...item, distanceMeters: value ?? Number.NaN })}/> : <>
            <PrescriptionField label="Rep min" integer value={item.repsMin} onChange={value => update({ ...item, repsMin: value ?? Number.NaN })}/>
            <PrescriptionField label="Rep max" integer value={item.repsMax} onChange={value => update({ ...item, repsMax: value ?? Number.NaN })}/>
          </>}
        <PrescriptionField label="Descanso (HH:MM:SS)" rest integer value={item.restSeconds} onChange={value => update({ ...item, restSeconds: value ?? Number.NaN })}/>
        <label className="workout-editor__field"><span>Equipamento</span><input readOnly value={item.equipmentId ? readEntity(state.equipment, item.equipmentId)?.name ?? 'Equipamento indisponível' : 'Sem equipamento'} title="A seleção será integrada pela Biblioteca."/></label>
      </div>
      <div className="workout-editor__substitutes">
        <button type="button" disabled><Plus size={17}/>Adicionar substituição</button>
        {item.substituteExerciseIds?.length ? <p>{item.substituteExerciseIds.map(id => readEntity(state.exercises, id)?.name ?? 'Exercício indisponível').join(' · ')}</p> : null}
      </div>
    </article>
  </>;
}

export function WorkoutEditor({ draft, issue, onDiscard }: { draft: WorkoutDraft; issue: DraftIssue | null; onDiscard: (trigger: HTMLElement) => void }) {
  const dispatch = useDemoDispatch();
  const [activeId, setActiveId] = useState<string | null>(draft.exercises[0]?.id ?? null);
  const activeIndex = Math.max(0, draft.exercises.findIndex(item => item.id === activeId));
  const item = draft.exercises[activeIndex];
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const select = (offset: number) => {
    const next = draft.exercises[activeIndex + offset]; if (next) setActiveId(next.id);
  };
  const move = (offset: number) => {
    const items = draft.exercises.map(exercise => exercise.id), target = activeIndex + offset;
    if (!item || target < 0 || target >= items.length) return;
    [items[activeIndex], items[target]] = [items[target]!, items[activeIndex]!];
    dispatch({ type: 'draft/reorder', draftId: draft.id, itemIds: items });
  };
  return <section className="workout-editor" aria-label="Editor de treino">
    <h1 className="workout-editor__sr-only" tabIndex={-1}>Editor de treino</h1>
    {item ? <>
      <nav className="workout-editor__navigation" aria-label="Exercícios do treino">
        <button type="button" aria-label="Exercício anterior" disabled={activeIndex === 0} onClick={() => select(-1)}><ChevronLeft size={18}/></button>
        <span role="status">{activeIndex + 1} / {draft.exercises.length}</span>
        <button ref={nextButton} type="button" aria-label="Próximo exercício" disabled={activeIndex === draft.exercises.length - 1} onClick={() => select(1)}><ChevronRight size={18}/></button>
      </nav>
      <div onPointerDown={event => {
        pointer.current = (event.target as HTMLElement).closest('input,select,button,label') ? null : { x: event.clientX, y: event.clientY };
      }} onPointerUp={event => {
        if (!pointer.current) return;
        const dx = event.clientX - pointer.current.x, dy = event.clientY - pointer.current.y; pointer.current = null;
        if (Math.abs(dx) >= 48 && Math.abs(dy) < Math.abs(dx) * .85) select(dx < 0 ? 1 : -1);
      }} onPointerCancel={() => { pointer.current = null; }}>
        <ExerciseCard key={item.id} item={item} draftId={draft.id} index={activeIndex} count={draft.exercises.length} onMove={move} onRemove={() => {
          const next = draft.exercises[activeIndex + 1] ?? draft.exercises[activeIndex - 1];
          setActiveId(next?.id ?? null); dispatch({ type: 'draft/remove', draftId: draft.id, itemId: item.id });
          window.requestAnimationFrame(() => { document.querySelector<HTMLElement>('.workout-editor__card h2')?.focus(); if (!next) document.querySelector<HTMLElement>('.workout-editor h1')?.focus(); });
        }}/>
      </div>
    </> : <div className="workout-editor__empty"><h2>Seu treino está vazio</h2><p>Adicione exercícios para começar.</p></div>}
    {issue && issue !== 'empty' && <p role="status" className="workout-editor__issue">{draftIssueText[issue]}</p>}
    <button className="workout-editor__discard" type="button" onClick={event => onDiscard(event.currentTarget)}>Descartar rascunho</button>
  </section>;
}

export function AddExerciseFooter({ onPress }: { onPress: (trigger: HTMLElement) => void }) {
  return <div className="workout-editor-footer"><button type="button" onClick={event => onPress(event.currentTarget)}><Plus size={20}/><span>Adicionar exercício</span></button></div>;
}
