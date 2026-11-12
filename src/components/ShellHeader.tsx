import { Check, ChevronLeft, Heart, Plus, Search } from 'lucide-react';
import wordmark from '../../assets/brand/goudduo/goudduo-wordmark-black.svg';
import { useNavigation } from '../app/NavigationProvider';
import type { HeaderVariant, SurfaceComposition } from '../app/surface-contracts';

export function ShellHeader({ variant, title, configuration }: {
  variant: HeaderVariant; title: string; configuration?: SurfaceComposition['header'];
}) {
  const { navigation } = useNavigation();
  if (variant === 'none') return null;
  if (variant === 'home') return <header className="app-header" data-header="home">
    <button className="shell-icon-button" type="button" aria-label="Buscar" onClick={event => navigation.openPanel('search', event.currentTarget)}><Search size={22}/></button>
    <img className="wordmark" src={wordmark} alt="goudduo" width="107" height="31"/>
    <div className="header-actions">
      <button className="shell-icon-button" type="button" aria-label="Criar" onClick={event => navigation.openPanel('create', event.currentTarget)}><Plus size={22}/></button>
      <button className="shell-icon-button" type="button" aria-label="Atividade" onClick={event => navigation.openPanel('activity', event.currentTarget)}><Heart size={22}/></button>
    </div>
  </header>;
  const action = configuration?.action;
  return <header className="app-header contextual-header" data-header={variant}>
    <button className="shell-icon-button" type="button" aria-label="Voltar" onClick={navigation.back}><ChevronLeft size={24}/></button>
    <p className="header-title">{configuration?.title ?? title}</p>
    <div className="header-action">{action && <button type="button" className={variant === 'editor' ? 'shell-icon-button' : 'header-text-action'} aria-label={variant === 'editor' ? 'Salvar' : undefined} disabled={action.disabled} onClick={action.onPress}>{variant === 'editor' ? <Check size={24} aria-hidden="true"/> : action.label}</button>}</div>
  </header>;
}
