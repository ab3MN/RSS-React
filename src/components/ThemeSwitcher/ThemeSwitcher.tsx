import { useContext } from 'react';

import s from './ThemeSwitcher.module.scss';

import { ThemeContext } from '@/context/ThemeContext';
import { Theme } from '@/constants';

export const ThemeSwitcher = () => {
  const { theme, handleSwitchTheme } = useContext(ThemeContext);

  return (
    <span className={s.container}>
      <label className={s.switch}>
        <input
          type="checkbox"
          className={s.input}
          onChange={handleSwitchTheme}
          value={theme}
          checked={theme === Theme.DARK}
        />
        <span className={s.slider}></span>
      </label>
    </span>
  );
};
