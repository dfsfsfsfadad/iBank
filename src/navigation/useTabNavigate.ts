import { useNavigation } from './NavigationContext';
import type { NavTab } from '../components/layout/BottomNav';

export function useTabNavigate() {
  const { navigate } = useNavigation();
  return (t: NavTab) => {
    if (t === 'home') navigate('home');
    else if (t === 'search') navigate('search');
    else if (t === 'mail') navigate('message');
    else navigate('setting');
  };
}
