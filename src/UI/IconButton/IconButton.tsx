import { FC, ReactNode } from 'react';

import s from './IconButton.module.scss';

interface Props {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  style?: { [key: string]: string };
}

export const IconButton: FC<Props> = ({ onClick, children, style, type = 'button' }) => (
  <button
    className={s.iconButton}
    type={type}
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
);
