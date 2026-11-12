import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigation } from '../app/NavigationProvider';
import type { Panel } from '../app/navigation';
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
const titles: Record<Panel, string> = { search: 'Busca', create: 'Criar', activity: 'Atividade' };
export function OverlayHost({ onPresence }: { onPresence: (present: boolean) => void }) {
  const { location, navigation } = useNavigation();
  const requested = location.panel;
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
    dialog.current?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault(); if (requestedRef.current) navigation.closePanel();
      }
      if (event.key !== 'Tab') return;
      const items = Array.from(dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input:not(:disabled),[tabindex="0"]') ?? []);
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
        if (target?.isConnected && !document.querySelector('[role="dialog"]') && JSON.stringify(navigation.getSnapshot().location.page) === originPage) target.focus();
      });
    };
  }, [rendered, navigation, onPresence]);
  if (!rendered) return null;
  const sheet = rendered === 'search' || rendered === 'create';
  const close = () => { if (!closing && requestedRef.current) navigation.closePanel(); };
  return createPortal(<div className={`overlay-backdrop ${closing ? 'is-closing' : ''} ${sheet ? 'is-sheet' : ''}`}
    data-testid="overlay-backdrop" onClick={event => { if (event.target === event.currentTarget) close(); }}>
    <div ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="panel-title" aria-describedby="panel-description"
      className="overlay-panel">
      {sheet && <div className="sheet-handle" aria-hidden="true" onPointerDown={event => {
        pointer.current = { id: event.pointerId, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId);
      }} onPointerUp={event => {
        if (pointer.current?.id === event.pointerId && event.clientY - pointer.current.y > 72) close();
        pointer.current = null;
      }} onPointerCancel={() => { pointer.current = null; }}><span/></div>}
      <h2 id="panel-title">{titles[rendered]}</h2>
      <p id="panel-description">Esta opção ainda não está disponível.</p>
      <Button onClick={close}>Fechar</Button>
    </div>
  </div>, document.body);
}
