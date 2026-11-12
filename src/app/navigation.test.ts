import { afterEach, describe, expect, it, vi } from 'vitest';
import { BrowserNavigation, parseLocation } from './navigation';
let router: BrowserNavigation | undefined;
afterEach(() => { router?.dispose(); vi.restoreAllMocks(); });
describe('typed browser navigation', () => {
  it('parses all five destinations, Home contexts, direct overlays and invalid routes', () => {
    for (const path of ['/home/treinos','/home/publicacoes','/home/business','/rotinas','/match','/mensagens','/perfil']) expect(parseLocation(new URL(path, 'https://example.test')).page.destination).not.toBe('not-found');
    expect(parseLocation(new URL('https://example.test/private'))).toEqual({ page: { destination: 'not-found' }, panel: null });
    expect(parseLocation(new URL('https://example.test/home/treinos?panel=activity')).panel).toBe('activity');
    expect(parseLocation(new URL('https://example.test/home/treinos?panel=invalid')).panel).toBeNull();
  });
  it('does not create duplicate entries and separates scroll positions by entry', () => {
    history.replaceState(null, '', '/home/treinos'); router = new BrowserNavigation(window);
    const start = router.getSnapshot(); router.saveScroll(245);
    router.navigate({ page: { destination: 'perfil' }, panel: null });
    expect(router.scrollPosition()).toBe(0);
    const current = router.getSnapshot(); router.navigate(current.location);
    expect(router.getSnapshot()).toBe(current);
    history.replaceState({ goudduoP1: true, key: start.key, depth: 0 }, '', '/home/treinos');
    dispatchEvent(new PopStateEvent('popstate'));
    expect(router.scrollPosition()).toBe(245);
  });
  it('remembers the last Home context and only closes an overlay once on rapid input', () => {
    history.replaceState(null, '', '/home/publicacoes'); router = new BrowserNavigation(window);
    router.navigate({ page: { destination: 'perfil' }, panel: null });
    expect(router.homePage()).toEqual({ destination: 'home', context: 'publicacoes' });
    router.openPanel('activity');
    const back = vi.spyOn(history, 'back').mockImplementation(() => {});
    router.closePanel(); router.closePanel();
    expect(back).toHaveBeenCalledTimes(1);
  });
  it('closes a direct linked panel by replacement, preserving the page', () => {
    history.replaceState(null, '', '/home/publicacoes?panel=search'); router = new BrowserNavigation(window);
    router.closePanel();
    expect(router.getSnapshot().location).toEqual({ page: { destination: 'home', context: 'publicacoes' }, panel: null });
    expect(router.getSnapshot().depth).toBe(0);
  });
});
