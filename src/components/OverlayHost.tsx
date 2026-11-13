import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigation } from '../app/NavigationProvider';
import type { Panel } from '../app/navigation';
import { isRoutinePanel } from '../app/routine-context';
import type { ContextualOverlay, OverlayResolver } from '../app/surface-contracts';
import { Button } from './primitives';
function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(media.matches);
    media.addEventListener('change', change); return () => media.removeEventListener('change', change);
  }, []);
  return reduced;
}
const titles: Record<Panel, string> = { search: 'Busca', create: 'Criar', activity: 'Atividade', 'routine-library': 'Biblioteca', 'routine-confirm-single': 'Confirmação', 'routine-naming': 'Nome do treino', 'routine-discard': 'Descartar rascunho?' };
export function OverlayHost({ onPresence, resolve }: { onPresence: (present: boolean) => void; resolve?: OverlayResolver | undefined }) {
  const { location, navigation, key } = useNavigation();
  const requested = location.panel;
  // Keep content mounted during exit, even after route/draft consumers stop requesting it.
  const configurationRef = useRef<ContextualOverlay | undefined>(undefined);
  const configurationKey = useRef<string | null>(null);
  if (requested) {
    const configuration = isRoutinePanel(requested) ? resolve?.(requested) : undefined;
    // A reducer may finish/resume the draft before History API closes this entry.
    // Keep its last valid consumer for exit; a different history entry must never
    // inherit old content when it has no valid context (Back/direct/reload).
    if (configuration || configurationKey.current !== key) {
      configurationRef.current = configuration;
      configurationKey.current = key;
    }
  }
  const [rendered, setRendered] = useState<Panel | null>(requested);
  const [closing, setClosing] = useState(false);
  const reduced = useReducedMotion();
  const dialog = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const pointer = useRef<{ id: number; y: number } | null>(null);
  const requestedRef = useRef(requested); requestedRef.current = requested;
  useEffect(() => {
    if (requested) { setRendered(requested); setClosing(false); return; }
    if (!rendered) return;
    setClosing(true);
    const timer = window.setTimeout(() => { setRendered(null); setClosing(false); }, reduced ? 0 : 310);
    return () => window.clearTimeout(timer);
  }, [requested, rendered, reduced]);
  useLayoutEffect(() => {
    if (!rendered) { onPresence(false); return; }
    onPresence(true);
    const active = document.activeElement;
    restoreFocus.current = navigation.panelOpener ?? (active instanceof HTMLElement && !dialog.current?.contains(active) ? active : null);
    const originPage = JSON.stringify(navigation.getSnapshot().location.page);
    const previous = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const root = document.getElementById('root'), wasInert = root?.inert ?? false;
    if (root) root.inert = true;
    const initial = configurationRef.current?.initialFocus?.();
    if (initial && dialog.current?.contains(initial)) initial.focus(); else dialog.current?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault(); if (requestedRef.current) navigation.closePanel();
      }
      if (event.key !== 'Tab') return;
      const items = Array.from(dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input:not(:disabled),textarea:not(:disabled),select:not(:disabled),[tabindex="0"]') ?? []);
      const first = items[0], last = items.at(-1);
      if (!first || !last) { event.preventDefault(); dialog.current?.focus(); return; }
      if (!dialog.current?.contains(document.activeElement)) { event.preventDefault(); first.focus(); }
      else if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog.current)) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', keyboard);
    return () => {
      if (root) root.inert = wasInert;
      document.body.style.overflow = previous; document.removeEventListener('keydown', keyboard);
      const target = restoreFocus.current;
      window.requestAnimationFrame(() => {
        if (document.querySelector('[role="dialog"]')) return;
        if (JSON.stringify(navigation.getSnapshot().location.page) === originPage) {
          if (target?.isConnected) target.focus();
        } else {
          const destination = document.querySelector<HTMLElement>('#main-content h1[tabindex="-1"]') ?? document.querySelector<HTMLElement>('#main-content');
          destination?.focus({ preventScroll: true });
        }
      });
    };
  }, [rendered, navigation, onPresence]);
  if (!rendered) return null;
  const configuration = configurationRef.current;
  const sheet = configuration ? configuration.presentation === 'sheet' : rendered === 'search' || rendered === 'create' || rendered === 'routine-library';
  const close = () => { if (!closing && requestedRef.current) navigation.closePanel(); };
  return createPortal(<div data-foundation className={`overlay-backdrop ${closing ? 'is-closing' : ''} ${sheet ? 'is-sheet' : ''}`}
    data-testid="overlay-backdrop" onClick={event => { if (event.target === event.currentTarget) close(); }}>
    <div ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="panel-title" aria-describedby="panel-description"
      className="overlay-panel" data-overlay-size={configuration?.size}>
      {sheet && <div className="sheet-handle" aria-hidden="true" onPointerDown={event => {
        pointer.current = { id: event.pointerId, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId);
      }} onPointerUp={event => {
        if (pointer.current?.id === event.pointerId && event.clientY - pointer.current.y > 72) close();
        pointer.current = null;
      }} onPointerCancel={() => { pointer.current = null; }}><span/></div>}
      <h2 id="panel-title">{configuration?.title ?? titles[rendered]}</h2>
      <p id="panel-description">{configuration?.description ?? 'Esta opção ainda não está disponível.'}</p>
      {configuration?.content ?? <Button onClick={close}>Fechar</Button>}
    </div>
  </div>, document.body);
}
