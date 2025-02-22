import { useEffect, useState } from 'react';

import useLocaLStorage from '@/hooks/useLocaLStorage';
import { Theme } from '@/constants';
import { ThemeContext } from '@/context/ThemeContext';

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const { setItem, getItem, removeItem } = useLocaLStorage('theme');
  const root = document.querySelector('#root');

  const handleSwitchTheme = () => {
    if (theme === Theme.LIGHT) {
      setTheme(Theme.DARK);
      setItem(Theme.DARK);
      root?.classList.add(Theme.DARK);
    } else {
      setTheme(Theme.LIGHT);
      root?.classList.remove(Theme.DARK);
      removeItem();
    }
  };

  useEffect(() => {
    if (getItem() === Theme.DARK) {
      setTheme(Theme.DARK);
      root?.classList.add(Theme.DARK);
    }
  }, [getItem, root?.classList]);

  return <ThemeContext.Provider value={{ theme, handleSwitchTheme }}>{children}</ThemeContext.Provider>;
};
