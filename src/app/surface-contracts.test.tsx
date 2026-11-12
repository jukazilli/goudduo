import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DemoProvider } from '../state/DemoProvider';
import { AppShell } from './AppShell';
import { BrowserNavigation, pagePath, parseLocation } from './navigation';
import { NavigationProvider } from './NavigationProvider';
import type { SurfaceIntegrations } from './surface-contracts';
let navigation: BrowserNavigation | undefined;
afterEach(() => { cleanup(); navigation?.dispose(); });
function mount(path: string, integrations?: SurfaceIntegrations) {
  history.replaceState(null, '', path); navigation = new BrowserNavigation(window);
  return render(<DemoProvider><NavigationProvider navigation={navigation}><AppShell {...(integrations ? { integrations } : {})}/></NavigationProvider></DemoProvider>);
}
describe('surface integration boundaries', () => {
  it('round-trips the entry journey and subordinate/immersive identifiers without collisions', () => {
    const paths = ['/acesso/splash','/acesso/login','/acesso/cadastro','/acesso/otp','/acesso/recuperacao','/acesso/termos','/acesso/privacidade','/onboarding',
      '/rotinas/demo-routine','/treinos/demo-workout/editar','/sessao/demo-session','/historico','/perfil/editar','/perfil/interesses','/perfil/demo-other','/configuracoes','/pulse/demo-pulse'];
    for (const path of paths) {
      const { page } = parseLocation(new URL(path, 'https://example.test'));
      expect(page.destination).not.toBe('not-found'); expect(pagePath(page)).toBe(path);
    }
    expect(parseLocation(new URL('https://example.test/perfil/editar')).page.destination).toBe('profile-edit');
    expect(parseLocation(new URL('https://example.test/treinos/bad%2Fid/editar')).page.destination).toBe('not-found');
    expect(() => pagePath({ destination: 'editor', workoutId: 'bad/id' })).toThrow();
  });
  it.each(['/acesso/login','/acesso/splash','/onboarding','/sessao/demo','/pulse/demo'])('does not impose global chrome on %s', path => {
    mount(path);
    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Criar' })).not.toBeInTheDocument();
    if (path.startsWith('/sessao/') || path.startsWith('/pulse/')) expect(screen.getByRole('button', { name: 'Voltar' })).toBeInTheDocument();
    else expect(screen.queryByRole('button', { name: 'Voltar' })).not.toBeInTheDocument();
  });
  it('accepts a real editor consumer action and footer, without inventing a default Save operation', () => {
    const save = vi.fn();
    mount('/treinos/demo-workout/editar', { resolve: page => page.destination === 'editor' ? {
      content: <h1>Conteúdo do consumidor</h1>, header: { title: 'Título contextual do consumidor', action: { label: 'Salvar', onPress: save } }, footer: <button>Rodapé do consumidor</button>,
    } : undefined });
    expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' })); expect(save).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Rodapé do consumidor');
    expect(screen.getByRole('banner')).toHaveTextContent('Título contextual do consumidor');
  });
  it('keeps incomplete editor honest and gives a direct route a deterministic parent', () => {
    mount('/treinos/demo-workout/editar');
    expect(screen.queryByRole('button', { name: 'Salvar' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Voltar' }));
    expect(navigation?.getSnapshot().location.page).toEqual({ destination: 'rotinas' });
  });
  it('composes Home bodies and Pulse variants locally without leaking one to another', () => {
    const integrations: SurfaceIntegrations = { home: {
      treinos: { content: <h1>Treinos do consumidor</h1>, pulse: { shape: 'squircle', content: <p>Slot técnico T</p> } },
      publicacoes: { content: <h1>Publicações do consumidor</h1>, pulse: { shape: 'circle', content: <p>Slot técnico P</p> } },
      business: { content: <h1>Business indisponível</h1> },
    } };
    mount('/home/treinos', integrations);
    expect(screen.getByText('Slot técnico T').parentElement).toHaveAttribute('data-pulse-shape','squircle');
    fireEvent.click(screen.getByRole('tab', { name: 'Publicações' }));
    expect(screen.queryByText('Slot técnico T')).not.toBeInTheDocument();
    expect(screen.getByText('Slot técnico P').parentElement).toHaveAttribute('data-pulse-shape','circle');
    fireEvent.click(screen.getByRole('tab', { name: 'Business' }));
    expect(screen.queryByText('Slot técnico P')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current','page');
  });
});
