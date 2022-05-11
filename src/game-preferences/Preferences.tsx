import React, { createContext, useContext, useEffect, useState } from 'react';
import { isServings, Servings } from './Servings';
import { cacheManager } from '../utils/CacheManager';

const HAS_RELAUNCHED_KEY = 'HasRelaunchedApp';
const PREFERRED_SERVING_KEY = 'PreferredServing';

type Props = {
  children: React.ReactNode;
};
export function Preferences({ children }: Props) {
  const [showTeachBubble, setShowTeachBubble] = useState(false);

  useEffect(() => {
    const hasRelaunchedApp = cacheManager.get(HAS_RELAUNCHED_KEY);
    if (!hasRelaunchedApp) setShowTeachBubble(true);
  }, []);

  useEffect(() => {
    cacheManager.set(HAS_RELAUNCHED_KEY, 'true');
  }, []);

  const [preferredServing, setPreferredServing] = useState(Servings.LAGER);

  useEffect(() => {
    const cachedServingPreference = cacheManager.get<Servings>(PREFERRED_SERVING_KEY);
    if (cachedServingPreference && isServings(cachedServingPreference.data))
      setPreferredServing(cachedServingPreference.data);
  }, []);

  useEffect(() => {
    cacheManager.set(PREFERRED_SERVING_KEY, preferredServing);
  }, [preferredServing]);

  return (
    <Context.Provider value={{ showTeachBubble, preferredServing, setPreferredServing }}>
      {children}
    </Context.Provider>
  );
}

const Context = createContext({
  showTeachBubble: false,
  preferredServing: Servings.LAGER,
  setPreferredServing: (s: Servings) => {}
});

export const usePreferences = () => useContext(Context);
