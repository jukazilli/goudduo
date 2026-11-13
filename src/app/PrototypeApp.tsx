import { useState, type ReactNode } from 'react';
import { AppShell } from './AppShell';
import { useNavigation } from './NavigationProvider';
import { useRoutineEditorAdapter } from './useRoutineEditorAdapter';
import { useDemoDispatch, useDemoState } from '../state/DemoProvider';
import type { Weekday } from '../domain/training';
import { RoutinesHome } from '../surfaces/routines/RoutinesHome';
import { WorkoutEditor, AddExerciseFooter } from '../surfaces/routines/WorkoutEditor';
import { workoutOverlayRenderers } from '../surfaces/routines/WorkoutSaveOverlays';
/** One integrated application. Presentation state survives route changes; entities stay in DemoProvider. */
export function PrototypeApp({ contentExtension }: { contentExtension?: ReactNode } = {}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const state = useDemoState(), dispatch = useDemoDispatch();
  const { navigation, location } = useNavigation();
  const adapter = useRoutineEditorAdapter(workoutOverlayRenderers);
  const openEditor = (routineId: string, day: Weekday, workoutId: string | undefined) => {
    const existing = Object.values(state.drafts).find(draft => draft.routineId === routineId && draft.day === day && (!workoutId || draft.workoutId === workoutId));
    if (existing && (location.page.destination === 'rotinas' || location.page.destination === 'routine')) {
      dispatch({ type: 'training/select', routineId, day });
      navigation.navigate({ page: { destination: 'editor', workoutId: existing.workoutId }, panel: null }, false, {
        routineContext: { routineId, day, workoutId: existing.workoutId, draftId: existing.id, baseRevision: existing.baseRevision,
          origin: { page: location.page.destination === 'routine' ? location.page : { destination: 'rotinas' }, scroll: navigation.scrollPosition() } },
      });
    } else adapter.openEditor({ routineId, day, workoutId: workoutId ?? crypto.randomUUID(), draftId: crypto.randomUUID() });
  };
  return <AppShell contentExtension={contentExtension} integrations={{ resolveOverlay: adapter.resolveOverlay, resolve: page => page.destination === 'rotinas' ? {
    content: <RoutinesHome expandedId={expandedId} onExpand={setExpandedId} onOpenEditor={openEditor}/>,
  } : page.destination === 'editor' && adapter.status === 'ready' && adapter.draft && adapter.header ? {
    header: adapter.header,
    content: <WorkoutEditor key={adapter.draft.id} draft={adapter.draft} issue={adapter.issue} onDiscard={adapter.requestDiscard}/>,
    footer: <AddExerciseFooter onPress={adapter.openLibrary}/>,
  } : undefined }}/>;
}
