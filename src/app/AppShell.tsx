import { useCallback, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ChevronLeft, Dumbbell, Heart, House, Map, MessageCircle, Plus, Search, UserRound } from 'lucide-react';
import wordmark from '../../assets/brand/goudduo/goudduo-wordmark-black.svg';
import { useDemoState } from '../state/DemoProvider';
import { OverlayHost } from '../components/OverlayHost';
import { EmptyState } from '../components/primitives';
import { NavLink, useNavigation } from './NavigationProvider';
import { type HomeContext, type Page } from './navigation';
const destinations = [
  { id: 'home', label: 'Home', icon: House }, { id: 'rotinas', label: 'Rotinas', icon: Dumbbell },
  { id: 'match', label: 'Match', icon: Map }, { id: 'mensagens', label: 'Mensagens', icon: MessageCircle },
  { id: 'perfil', label: 'Perfil', icon: UserRound },
] as const;
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
    case 'not-found': return <EmptyState title="Página não encontrada">Use a navegação para continuar.</EmptyState>;
  }
}
export function AppShell({ contentExtension }: { contentExtension?: ReactNode } = {}) {
  const { navigation, location, key, depth } = useNavigation();
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
    <div className="app-shell" inert={overlayPresent || Boolean(location.panel)} data-testid="app-shell">
      <a className="skip-link" href="#main-content">Ir para o conteúdo</a>
      <header className="app-header">
        <button className="icon-button" type="button" aria-label="Buscar" onClick={event => navigation.openPanel('search', event.currentTarget)}><Search size={22}/></button>
        <img className="wordmark" src={wordmark} alt="goudduo" width="107" height="31"/>
        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="Criar" onClick={event => navigation.openPanel('create', event.currentTarget)}><Plus size={22}/></button>
          <button className="icon-button" type="button" aria-label="Atividade" onClick={event => navigation.openPanel('activity', event.currentTarget)}><Heart size={22}/></button>
        </div>
      </header>
      {location.page.destination === 'home' && <nav aria-label="Navegação da Home"><div className="home-tabs" aria-label="Contextos da Home" role="tablist" onKeyDown={arrowTabs}>
        {contexts.map(context => <NavLink key={context.id} location={{ page: { destination: 'home', context: context.id }, panel: null }}
          id={`tab-${context.id}`} role="tab" data-context={context.id} aria-controls="home-panel" aria-selected={homeContext === context.id}
          tabIndex={homeContext === context.id ? 0 : -1}>{context.label}</NavLink>)}
      </div></nav>}
      <main id="main-content" ref={main} className="app-content" tabIndex={-1} onScroll={event => navigation.saveScroll(event.currentTarget.scrollTop)}
>
        {(depth > 0 || location.page.destination !== 'home') && <button type="button" className="icon-button back-button" aria-label="Voltar" onClick={navigation.back}><ChevronLeft size={24}/></button>}
        <section id="home-panel" role={location.page.destination === 'home' ? 'tabpanel' : undefined} aria-labelledby={location.page.destination === 'home' ? `tab-${homeContext}` : undefined}><PageContent page={location.page}/>{contentExtension}</section>
      </main>
      <nav className="tab-bar" aria-label="Navegação principal">
        {destinations.map(({ id, label, icon: Icon }) => <NavLink key={id} location={{ page: id === 'home' ? navigation.homePage() : { destination: id }, panel: null }}
          aria-label={label} aria-current={location.page.destination === id ? 'page' : undefined}><Icon size={24} aria-hidden="true"/></NavLink>)}
      </nav>
    </div>
    <OverlayHost onPresence={onPresence}/>
  </>;
}
