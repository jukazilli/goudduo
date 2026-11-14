import { useEffect, useRef } from 'react';
import type { Weekday } from '../domain/training';
import { useDemoDispatch, useDemoState } from '../state/DemoProvider';
import { readEntity, validateDraft, type DraftIssue, type WorkoutDraft } from '../state/training';
import type { BrowserNavigation } from './navigation';
import { useNavigation } from './NavigationProvider';
import type { RoutineEditorContext, RoutinePanel, RoutineOriginPage } from './routine-context';
import type { ContextualOverlay, OverlayResolver, SurfaceComposition } from './surface-contracts';

const dayNames: Record<Weekday, string> = { mon: 'segunda-feira', tue: 'terça-feira', wed: 'quarta-feira', thu: 'quinta-feira', fri: 'sexta-feira', sat: 'sábado', sun: 'domingo' };
export const suggestWorkoutName = (day: Weekday) => `Treino de ${dayNames[day]}`;
export interface RoutineOverlayContract {
  readonly context: RoutineEditorContext;
  readonly draft: WorkoutDraft;
  readonly issue: DraftIssue | null;
  readonly suggestedName: string;
  readonly close: () => void;
  readonly continueEditing: () => void;
  readonly confirmSingle: () => void;
  readonly submitName: (name: string) => void;
  readonly cancelEditing: (confirmed: boolean) => 'confirmation-required' | 'cancelled';
}
export type RoutineOverlayRenderers = Partial<Record<RoutinePanel, (contract: RoutineOverlayContract) => Pick<ContextualOverlay, 'content' | 'initialFocus'> & Partial<Pick<ContextualOverlay, 'title'>>>>;
function returnToOrigin(navigation: BrowserNavigation, value: RoutineEditorContext) {
  navigation.navigate({ page: value.origin.page, panel: null }, true, { scroll: value.origin.scroll });
}
export function useRoutineEditorAdapter(renderers: RoutineOverlayRenderers = {}) {
  const state = useDemoState(), dispatch = useDemoDispatch();
  const { navigation, location, routineContext } = useNavigation();
  const draft = routineContext ? readEntity(state.drafts, routineContext.draftId) : undefined;
  const available = Boolean(draft && routineContext && location.page.destination === 'editor' &&
    location.page.workoutId === routineContext.workoutId && draft.workoutId === routineContext.workoutId &&
    draft.routineId === routineContext.routineId && draft.day === routineContext.day && draft.baseRevision === routineContext.baseRevision);
  const context = available ? routineContext : undefined;
  const pending = useRef<{ kind: 'prepare' | 'confirm' | 'commit'; context: RoutineEditorContext } | null>(null);
  useEffect(() => {
    const intent = pending.current;
    if (!intent) return;
    const current = readEntity(state.drafts, intent.context.draftId);
    // Intent belongs to this Editor, never a later tab/Editor or a stale history entry.
    if (routineContext?.draftId !== intent.context.draftId || location.page.destination !== 'editor') { pending.current = null; return; }
    if (intent.kind === 'commit' && !current) {
      pending.current = null;
      const saved = readEntity(state.workouts, intent.context.workoutId);
      if (saved?.revision === intent.context.baseRevision + 1) returnToOrigin(navigation, intent.context);
      return;
    }
    if (!current) { pending.current = null; return; }
    pending.current = null;
    if (current.issue) return;
    if (current.stage === 'confirm-single') navigation.openPanel('routine-confirm-single', undefined, Boolean(location.panel));
    if (current.stage === 'naming') navigation.openPanel('routine-naming', undefined, Boolean(location.panel));
  }, [state.drafts, state.workouts, navigation, routineContext, location.page.destination, location.panel]);
  const requestSave = () => {
    if (!context) return;
    pending.current = { kind: 'prepare', context }; dispatch({ type: 'draft/prepare', draftId: context.draftId });
  };
  const close = () => navigation.closePanel();
  const continueEditing = () => {
    if (!context) return;
    dispatch({ type: 'draft/resume', draftId: context.draftId }); close();
  };
  const confirmSingle = () => {
    if (!context || draft?.stage !== 'confirm-single') return;
    pending.current = { kind: 'confirm', context }; dispatch({ type: 'draft/confirm-single', draftId: context.draftId });
  };
  const submitName = (name: string) => {
    if (!context || draft?.stage !== 'naming') return;
    pending.current = { kind: 'commit', context }; dispatch({ type: 'draft/commit', draftId: context.draftId, name });
  };
  const issue = context && draft ? validateDraft(state, draft) ?? draft.issue : null;
  const cancelEditing = (confirmed: boolean) => {
    if (!context || !confirmed) return 'confirmation-required' as const;
    dispatch({ type: 'draft/cancel', draftId: context.draftId }); returnToOrigin(navigation, context); return 'cancelled' as const;
  };
  const header: SurfaceComposition['header'] = context && draft ? {
    title: readEntity(state.workouts, context.workoutId)?.name ?? suggestWorkoutName(context.day),
    action: { label: 'Salvar', onPress: requestSave, disabled: Boolean(validateDraft(state, draft)) },
    onBack: navigation.back,
  } : undefined;
  const resolveOverlay: OverlayResolver = panel => {
    const render = renderers[panel];
    if (!context || !draft || !render || (panel === 'routine-confirm-single' && draft.stage !== 'confirm-single') || (panel === 'routine-naming' && draft.stage !== 'naming')) return undefined;
    return { title: panel === 'routine-library' ? 'Biblioteca' : panel === 'routine-confirm-single' ? 'Confirmar treino' : panel === 'routine-discard' ? 'Descartar rascunho?' : 'Nome do treino',
      description: panel === 'routine-library' ? 'Exercícios do rascunho atual.' : panel === 'routine-confirm-single' ? 'Treino com um exercício.' : panel === 'routine-discard' ? 'As alterações não salvas serão descartadas. O treino salvo será preservado.' : 'Nomeação final do treino.',
      presentation: panel === 'routine-library' ? 'sheet' : 'modal', ...(panel === 'routine-library' ? { size: 'library' as const } : {}),
      ...render({ context, draft, issue, suggestedName: suggestWorkoutName(context.day), close, continueEditing, confirmSingle, submitName, cancelEditing }),
    };
  };
  return { status: context ? 'ready' as const : 'context-unavailable' as const, context, draft: context ? draft : undefined, issue, header, resolveOverlay,
    openEditor: (input: { routineId: string; day: Weekday; workoutId: string; draftId: string }) => {
      const source = location.page;
      if (source.destination !== 'rotinas' && source.destination !== 'routine' && !(source.destination === 'home' && source.context === 'treinos')) return false;
      const routine = readEntity(state.routines, input.routineId), workout = readEntity(state.workouts, input.workoutId);
      const binding = routine?.days[input.day] ?? null;
      if (!routine || !input.draftId.trim() || readEntity(state.drafts, input.draftId) || (binding && binding !== input.workoutId) || (!binding && workout)) return false;
      const next: RoutineEditorContext = { ...input, baseRevision: workout?.revision ?? 0, origin: { page: source as RoutineOriginPage, scroll: navigation.scrollPosition() } };
      // Validate opaque route IDs before dispatching; route contains only workoutId.
      if (!/^[A-Za-z0-9_-]{1,80}$/.test(input.workoutId)) return false;
      dispatch({ type: 'draft/open', ...input }); dispatch({ type: 'training/select', routineId: input.routineId, day: input.day });
      navigation.navigate({ page: { destination: 'editor', workoutId: input.workoutId }, panel: null }, false, { routineContext: next });
      return true;
    },
    openLibrary: (trigger?: HTMLElement) => { if (context) navigation.openPanel('routine-library', trigger); },
    requestDiscard: (trigger?: HTMLElement) => { if (context) navigation.openPanel('routine-discard', trigger); },
    requestSave, continueEditing, confirmSingle, submitName,
    /** A future confirmation UI must call with true; Back never calls draft/cancel. */
    cancelEditing,
  };
}
