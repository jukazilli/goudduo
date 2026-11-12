import { createContext, useContext, useSyncExternalStore, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { BrowserNavigation, locationPath, type Location } from './navigation';
const Context = createContext<BrowserNavigation | null>(null);
export function NavigationProvider({ navigation, children }: { navigation: BrowserNavigation; children: ReactNode }) {
  return <Context value={navigation}>{children}</Context>;
}
export function useNavigation() {
  const navigation = useContext(Context);
  if (!navigation) throw new Error('NavigationProvider ausente');
  const entry = useSyncExternalStore(navigation.subscribe, navigation.getSnapshot);
  return { navigation, ...entry };
}
export function NavLink({ location, children, onClick, ...props }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { location: Location }) {
  const { navigation } = useNavigation();
  return <a {...props} href={locationPath(location)} onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); navigation.navigate(location);
  }}>{children}</a>;
}
