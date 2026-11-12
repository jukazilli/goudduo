import { Dumbbell, House, Map, MessageCircle, User } from 'lucide-react';
import { NavLink, useNavigation } from '../app/NavigationProvider';
import type { Destination } from '../app/navigation';
const destinations = [
  { id: 'home', label: 'Home', icon: House }, { id: 'rotinas', label: 'Rotinas', icon: Dumbbell },
  { id: 'match', label: 'Match', icon: Map }, { id: 'mensagens', label: 'Mensagens', icon: MessageCircle },
  { id: 'perfil', label: 'Perfil', icon: User },
] as const;
export function TabBar({ active, onHomeReselect }: { active: Destination | undefined; onHomeReselect: () => void }) {
  const { navigation } = useNavigation();
  return <nav className="tab-bar" aria-label="Navegação principal">
    {destinations.map(({ id, label, icon: Icon }) => <NavLink key={id}
      location={{ page: id === 'home' ? navigation.homePage() : { destination: id }, panel: null }}
      aria-label={label} aria-current={active === id ? 'page' : undefined}
      onClick={event => {
        if (id === 'home' && active === 'home' && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) {
          event.preventDefault(); onHomeReselect();
        }
      }}><Icon size={24} strokeWidth={2} aria-hidden="true"/></NavLink>)}
  </nav>;
}
