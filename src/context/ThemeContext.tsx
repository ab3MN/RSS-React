import { createContext } from 'react';

import { Theme } from '@/constants';

interface Context {
  theme: Theme;
  handleSwitchTheme: () => void;
}

export const ThemeContext = createContext<Context>({
  theme: Theme.LIGHT,
  handleSwitchTheme: () => {},
});
