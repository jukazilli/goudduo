import type { DemoUser } from '../../state/model';
/** Presentation only. No content, media, metrics, publication or viewing commands. */
export type PulseViewState = 'unknown' | 'seen' | 'unseen';
export interface DemonstrationPulseIdentity {
  readonly id: string;
  readonly displayName: string;
  readonly viewState: PulseViewState;
  readonly scope: 'demonstration';
}
export interface TrainingPulseIdentity {
  readonly id: string;
  readonly displayName: string;
  readonly kind: 'own' | 'institutional' | 'demonstration';
  readonly viewState: PulseViewState;
}
export function pulseInitial(name: string) {
  const first = Array.from(name.trim().normalize('NFC'))[0];
  return first ? first.toLocaleUpperCase('pt-BR') : '?';
}
/** Real own identity + public institutional identity; no synthetic people added by default. */
export function trainingPulseIdentities(user: DemoUser, examples: readonly DemonstrationPulseIdentity[] = []): TrainingPulseIdentity[] {
  const items: TrainingPulseIdentity[] = [
    { id: `own:${user.id}`, displayName: user.displayName, kind: 'own', viewState: 'unknown' },
    { id: 'institutional:goudduo', displayName: 'goudduo', kind: 'institutional', viewState: 'unknown' },
  ];
  const ids = new Set(items.map(item => item.id));
  for (const example of examples) {
    if (example.scope !== 'demonstration' || !example.id.trim() || !example.displayName.trim() || ids.has(example.id)) continue;
    ids.add(example.id); items.push({ id: example.id, displayName: example.displayName, kind: 'demonstration', viewState: example.viewState });
  }
  return items;
}
/** Seen ice is canonical. Exact unseen gradient stops remain pending; never invent them. */
export const pulseRing = (state: PulseViewState) => state === 'seen' ? 'ice' : 'neutral';
export function pulseAccessibleName(item: TrainingPulseIdentity) {
  if (item.kind === 'own') return `Criar Pulse de ${item.displayName} — indisponível`;
  if (item.kind === 'institutional') return 'goudduo — sem conteúdo Pulse disponível';
  const status = item.viewState === 'seen' ? 'visto, estado demonstrativo' : item.viewState === 'unseen' ? 'não visto, estado demonstrativo; gradiente pendente' : 'sem informação de visualização';
  return `${item.displayName} — ${status}; visualizador indisponível`;
}
