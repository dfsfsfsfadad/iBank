import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Route } from './types';

interface Nav {
  route: Route;
  navigate: (r: Route) => void;
}

const Ctx = createContext<Nav>({ route: 'home', navigate: () => {} });

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [route, setRoute] = useState<Route>('signin');
  const value = useMemo<Nav>(() => ({ route, navigate: setRoute }), [route]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useNavigation = () => useContext(Ctx);