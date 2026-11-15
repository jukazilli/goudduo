export type SessionPanel = 'session-options' | 'session-map' | 'session-finish' | 'session-discard' | 'session-help' | 'session-conflict';
export const isSessionPanel = (panel: string): panel is SessionPanel => ['session-options','session-map','session-finish','session-discard','session-help','session-conflict'].includes(panel);
