import type { Weekday } from '../domain/training';
export type RoutineOriginPage = { readonly destination: 'rotinas' } |
  { readonly destination: 'routine'; readonly routineId: string } |
  { readonly destination: 'home'; readonly context: 'treinos' };
/** References only; lives in BrowserNavigation memory, never URL/history.state/storage. */
export interface RoutineEditorContext {
  readonly routineId: string; readonly day: Weekday; readonly workoutId: string;
  readonly draftId: string; readonly baseRevision: number;
  readonly origin: { readonly page: RoutineOriginPage; readonly scroll: number };
}
export type RoutinePanel = 'routine-library' | 'routine-confirm-single' | 'routine-naming';
export function isRoutinePanel(panel: string): panel is RoutinePanel {
  return ['routine-library', 'routine-confirm-single', 'routine-naming'].includes(panel);
}
