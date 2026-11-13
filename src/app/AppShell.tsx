import { useCallback, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import { ShellHeader } from '../components/ShellHeader';
import { TabBar } from '../components/TabBar';
import { pageTitle, shellPolicy, type SurfaceIntegrations } from './surface-contracts';
import { useDemoState } from '../state/DemoProvider';
import { OverlayHost } from '../components/OverlayHost';
import { EmptyState } from '../components/primitives';
import { NavLink, useNavigation } from './NavigationProvider';
import { type HomeContext, type Page } from './navigation';
const contexts = [{ id: 'treinos', label: 'Treinos' }, { id: 'publicacoes', label: 'Publicações' }, { id: 'business', label: 'Business' }] as const;

function PageContent({ page }: { page: Page }) {
  const { user } = useDemoState();
  switch (page.destination) {
    case 'home':
      if (page.context === 'treinos') return <EmptyState title="Treinos">Treinos ainda não estão disponíveis.</EmptyState>;
      if (page.context === 'publicacoes') return <EmptyState title="Publicações">Publicações ainda não estão disponíveis.</EmptyState>;
      return <EmptyState title="Business">Os recursos profissionais dependem de elegibilidade e verificação.</EmptyState>;
    case 'perfil': return <EmptyState title="Perfil"><span data-testid="demo-user-name">{user.displayName}</span></EmptyState>;
    case 'rotinas': return <EmptyState title="Rotinas">Rotinas ainda não estão disponíveis.</EmptyState>;
    case 'match': return <EmptyState title="Match">A busca por parceiros ainda não está disponível.</EmptyState>;
    case 'mensagens': return <EmptyState title="Mensagens">As conversas ainda não estão disponíveis.</EmptyState>;
    case 'not-found': return <EmptyState title="Página não encontrada">Use o retorno para continuar.</EmptyState>;
    default: return <EmptyState title={pageTitle(page)}>Esta superfície ainda não está disponível.</EmptyState>;
  }
}
export function AppShell({ contentExtension, integrations }: { contentExtension?: ReactNode; integrations?: SurfaceIntegrations } = {}) {
  const { navigation, location, key } = useNavigation();
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef<string | null>(null);
  const [overlayPresent, setOverlayPresent] = useState(Boolean(location.panel));
  const onPresence = useCallback((present: boolean) => setOverlayPresent(present), []);
  const pageKey = JSON.stringify(location.page);
  useLayoutEffect(() => {
    if (main.current) main.current.scrollTop = navigation.scrollPosition();
    if (previousPath.current !== null && previousPath.current !== pageKey && !location.panel) {
      main.current?.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true });
    }
    previousPath.current = pageKey;
  }, [key, pageKey, location.panel, navigation]);
  const policy = shellPolicy(location.page);
  const surface = location.page.destination === 'home' ? undefined : integrations?.resolve?.(location.page);
  const homeComposition = location.page.destination === 'home' ? integrations?.home?.[location.page.context] : undefined;
  const composition = homeComposition ?? surface;
  const pulse = homeComposition?.pulse;
  const hasFooter = Boolean(surface?.footer);
  const homeContext: HomeContext = location.page.destination === 'home' ? location.page.context : 'treinos';
  const arrowTabs = (event: KeyboardEvent<HTMLElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault(); const index = contexts.findIndex(c => c.id === homeContext);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowRight' ? 1 : 2)) % 3;
    const context = contexts[next]?.id;
    if (context) { navigation.navigate({ page: { destination: 'home', context }, panel: null });
      event.currentTarget.querySelector<HTMLElement>(`[data-context="${context}"]`)?.focus(); }
  };
  return <>
    <div className="app-shell" data-foundation data-shell-mode={policy.mode}
      data-home-context={location.page.destination === 'home' ? location.page.context : undefined}
      inert={overlayPresent || Boolean(location.panel)} data-testid="app-shell">
      <a className="skip-link" href="#main-content">Ir para o conteúdo</a>
      <ShellHeader variant={policy.header} title={pageTitle(location.page)} configuration={surface?.header}/>
      {location.page.destination === 'home' && <nav aria-label="Navegação da Home"><div className="home-tabs" aria-label="Contextos da Home" role="tablist" onKeyDown={arrowTabs}>
        {contexts.map(context => <NavLink key={context.id} location={{ page: { destination: 'home', context: context.id }, panel: null }}
          id={`tab-${context.id}`} role="tab" data-context={context.id} aria-controls="home-panel" aria-selected={homeContext === context.id}
          tabIndex={homeContext === context.id ? 0 : -1}>{context.label}</NavLink>)}
      </div></nav>}
      <main id="main-content" ref={main} className="app-content" tabIndex={-1}
        data-safe-top={policy.header === 'none' || undefined} data-safe-bottom={(!policy.tabBar && !hasFooter) || undefined}
        onScroll={event => navigation.saveScroll(event.currentTarget.scrollTop)}>
        {policy.mode === 'immersive' && !surface && <button type="button" className="shell-icon-button immersive-return" aria-label="Voltar" onClick={navigation.back}><ChevronLeft size={24}/></button>}
        <section id="home-panel" role={location.page.destination === 'home' ? 'tabpanel' : undefined}
          aria-labelledby={location.page.destination === 'home' ? `tab-${homeContext}` : undefined}>
          {pulse && <div data-pulse-shape={pulse.shape}>{pulse.content}</div>}
          {composition?.content ?? <PageContent page={location.page}/>}
          {contentExtension}
        </section>
      </main>
      {hasFooter && <footer className="surface-footer" data-safe-bottom={!policy.tabBar || undefined}>{surface?.footer}</footer>}
      {policy.tabBar && <TabBar active={policy.activeDestination} onHomeReselect={() => {
        navigation.saveScroll(0);
        main.current?.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }}/>}
    </div>
    <OverlayHost onPresence={onPresence} resolve={integrations?.resolveOverlay}/>
  </>;
}
