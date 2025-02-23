import React from 'react';

import { Arrow } from '../Arrow/Arrow';
import BlankLink from '../NavLink/BlankLink';

import s from './Footer.module.scss';

import Logo from '@/assets/Logo_RS.svg?react';
import NavigationLink from '@/UI/NavLink/NavigationLink';
import { PATH } from '@/constants/path';

export const Footer: React.FC = () => (
  <footer className={s.footer}>
    <div className={s.container}>
      <BlankLink
        href={PATH.GITHUB}
        label={
          <span className={s.logo}>
            <Logo />
          </span>
        }
      />

      <nav className={s.links}>
        <BlankLink
          href={PATH.GITHUB}
          label="Github"
        />

        <NavigationLink
          to={PATH.CHARACTERS}
          label="characters"
        />
        <NavigationLink
          to={PATH.CART}
          label="cart"
        />
      </nav>
      <a
        href="#"
        className={s.arrow_link}
      >
        <Arrow direction="up" />
      </a>
    </div>
  </footer>
);
