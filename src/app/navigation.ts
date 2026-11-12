export type HomeContext = 'treinos' | 'publicacoes' | 'business';
export type Destination = 'home' | 'rotinas' | 'match' | 'mensagens' | 'perfil';
export type Page = { readonly destination: 'home'; readonly context: HomeContext } |
  { readonly destination: Exclude<Destination, 'home'> } | { readonly destination: 'not-found' };
export type Panel = 'search' | 'create' | 'activity';
export interface Location { readonly page: Page; readonly panel: Panel | null }
export interface NavigationEntry { readonly location: Location; readonly key: string; readonly depth: number }
const panels: readonly string[] = ['search', 'create', 'activity'];
export function parseLocation(url: URL): Location {
  const path = url.pathname.replace(/\/$/, '') || '/';
  let page: Page;
  const context = path.split('/')[2];
  if (path === '/' || path === '/home' || path === '/lab') page = { destination: 'home', context: 'treinos' };
  else if (path.startsWith('/home/') && path.split('/').length === 3 && ['treinos', 'publicacoes', 'business'].includes(context ?? '')) page = { destination: 'home', context: context as HomeContext };
  else if (['/rotinas', '/match', '/mensagens', '/perfil'].includes(path)) page = { destination: path.slice(1) as Exclude<Destination, 'home'> };
  else page = { destination: 'not-found' };
  const panel = url.searchParams.get('panel');
  return { page, panel: panel && panels.includes(panel) ? panel as Panel : null };
}
export function pagePath(page: Page): string {
  return page.destination === 'home' ? `/home/${page.context}` : page.destination === 'not-found' ? '/nao-encontrado' : `/${page.destination}`;
}
export function locationPath(location: Location): string {
  return pagePath(location.page) + (location.panel ? `?panel=${location.panel}` : '');
}
interface HistoryMarker { readonly goudduoP1: true; readonly key: string; readonly depth: number }
function isMarker(value: unknown): value is HistoryMarker {
  if (!value || typeof value !== 'object') return false;
  const v = value as Partial<HistoryMarker>;
  return v.goudduoP1 === true && typeof v.key === 'string' && typeof v.depth === 'number' && Number.isInteger(v.depth) && v.depth >= 0;
}
/** One browser adapter, no app data in URLs/history/storage. Positions remain in memory. */
export class BrowserNavigation {
  private listeners = new Set<() => void>();
  private positions = new Map<string, number>();
  private entry: NavigationEntry;
  private lastHome: HomeContext = 'treinos';
  private pendingPanelClose: string | null = null;
  panelOpener: HTMLElement | null = null;
  private pop = () => {
    const state: unknown = this.browser.history.state;
    const marker = isMarker(state) ? state : this.marker(0);
    if (!isMarker(state)) this.browser.history.replaceState(marker, '');
    this.entry = { location: parseLocation(new URL(this.browser.location.href)), key: marker.key, depth: marker.depth };
    this.pendingPanelClose = null;
    if (this.entry.location.page.destination === 'home') this.lastHome = this.entry.location.page.context;
    this.emit();
  };
  constructor(private browser: Window) {
    const state: unknown = browser.history.state;
    const marker = isMarker(state) ? state : this.marker(0);
    browser.history.replaceState(marker, '');
    this.entry = { location: parseLocation(new URL(browser.location.href)), key: marker.key, depth: marker.depth };
    if (this.entry.location.page.destination === 'home') this.lastHome = this.entry.location.page.context;
    browser.history.scrollRestoration = 'manual';
    browser.addEventListener('popstate', this.pop);
  }
  private marker(depth: number): HistoryMarker { return { goudduoP1: true, key: crypto.randomUUID(), depth }; }
  private emit() { this.listeners.forEach(listener => listener()); }
  getSnapshot = () => this.entry;
  homePage = (): Page => ({ destination: 'home', context: this.lastHome });
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; };
  dispose = () => { this.browser.removeEventListener('popstate', this.pop); this.listeners.clear(); };
  saveScroll = (position: number) => { this.positions.set(this.entry.key, Math.max(0, position)); };
  scrollPosition = () => this.positions.get(this.entry.key) ?? 0;
  navigate = (location: Location, replace = false) => {
    if (locationPath(location) === locationPath(this.entry.location)) return;
    const marker = this.marker(replace ? this.entry.depth : this.entry.depth + 1);
    if (location.panel || this.entry.location.panel) this.positions.set(marker.key, this.scrollPosition());
    this.browser.history[replace ? 'replaceState' : 'pushState'](marker, '', locationPath(location));
    this.entry = { location, key: marker.key, depth: marker.depth };
    this.pendingPanelClose = null;
    if (location.page.destination === 'home') this.lastHome = location.page.context;
    this.emit();
  };
  openPanel = (panel: Panel, trigger?: HTMLElement) => {
    const active = this.browser.document.activeElement;
    this.panelOpener = trigger ?? (active instanceof HTMLElement ? active : null);
    this.navigate({ ...this.entry.location, panel });
  };
  closePanel = () => {
    if (!this.entry.location.panel || this.pendingPanelClose === this.entry.key) return;
    this.pendingPanelClose = this.entry.key;
    if (this.entry.depth > 0) this.browser.history.back();
    else this.navigate({ ...this.entry.location, panel: null }, true);
  };
  back = () => {
    if (this.entry.location.panel) this.closePanel();
    else if (this.entry.depth > 0) this.browser.history.back();
    else this.navigate({ page: { destination: 'home', context: 'treinos' }, panel: null }, true);
  };
}
