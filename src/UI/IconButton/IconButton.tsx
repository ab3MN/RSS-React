import { FC, ReactNode } from 'react';

import s from './IconButton.module.scss';

interface Props {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  width?: string;
  height?: string;
}

export const IconButton: FC<Props> = ({ onClick, children, width, height, type = 'button' }) => (
  <button
    className={s.iconButton}
    type={type}
    onClick={onClick}
    style={{ width, height }}
  >
    {children}
  </button>
);
