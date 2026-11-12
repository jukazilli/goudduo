import type { ReactNode } from 'react';
import type { Destination, HomeContext, Page } from './navigation';

export interface HeaderAction { readonly label: string; readonly onPress: () => void; readonly disabled?: boolean }
export interface SurfaceComposition {
  readonly content: ReactNode;
  readonly header?: { readonly title: string; readonly action?: HeaderAction };
  /** Contextual footer sits above the TabBar when present; only the last region owns the bottom inset. */
  readonly footer?: ReactNode;
}
export type PulseSlot<Shape extends 'circle' | 'squircle'> = { readonly shape: Shape; readonly content: ReactNode };
export interface HomeCompositions {
  readonly treinos?: { readonly content: ReactNode; readonly pulse?: PulseSlot<'squircle'> };
  readonly publicacoes?: { readonly content: ReactNode; readonly pulse?: PulseSlot<'circle'> };
  readonly business?: { readonly content: ReactNode; readonly pulse?: never };
}
export interface SurfaceIntegrations {
  readonly home?: HomeCompositions;
  readonly resolve?: (page: Exclude<Page, { destination: 'home' }>) => SurfaceComposition | undefined;
}
export type HeaderVariant = 'home' | 'contextual' | 'editor' | 'none';
export interface ShellPolicy {
  readonly mode: 'home' | 'destination' | 'contextual' | 'access' | 'immersive';
  readonly header: HeaderVariant;
  readonly tabBar: boolean;
  readonly activeDestination?: Destination;
}
/** Preparatory chrome policies; no feature implementation or service eligibility. */
export function shellPolicy(page: Page): ShellPolicy {
  switch (page.destination) {
    case 'home': return { mode: 'home', header: 'home', tabBar: true, activeDestination: 'home' };
    case 'rotinas': case 'match': case 'mensagens': case 'perfil':
      return { mode: 'destination', header: 'contextual', tabBar: true, activeDestination: page.destination };
    case 'access': case 'onboarding': return { mode: 'access', header: 'none', tabBar: false };
    case 'pulse-viewer': case 'session': return { mode: 'immersive', header: 'none', tabBar: false };
    case 'editor': return { mode: 'contextual', header: 'editor', tabBar: true, activeDestination: 'rotinas' };
    default: return { mode: 'contextual', header: 'contextual', tabBar: false };
  }
}
export function pageTitle(page: Page): string {
  switch (page.destination) {
    case 'home': return ({ treinos: 'Treinos', publicacoes: 'Publicações', business: 'Business' } satisfies Record<HomeContext, string>)[page.context];
    case 'access': return { splash: 'Splash', login: 'Login', cadastro: 'Cadastro', otp: 'OTP', recuperacao: 'Recuperação', termos: 'Termos', privacidade: 'Privacidade' }[page.step];
    case 'rotinas': return 'Rotinas'; case 'match': return 'Match'; case 'mensagens': return 'Mensagens'; case 'perfil': return 'Perfil';
    case 'routine': return 'Rotina'; case 'editor': return 'Editor'; case 'session': return 'Sessão'; case 'history': return 'Histórico';
    case 'profile-visited': return 'Perfil visitado'; case 'profile-edit': return 'Editar perfil'; case 'interests': return 'Interesses';
    case 'settings': return 'Configurações'; case 'onboarding': return 'Onboarding'; case 'pulse-viewer': return 'Pulse';
    case 'not-found': return 'Página não encontrada';
  }
}
