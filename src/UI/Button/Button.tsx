import { FC } from 'react';
import cn from 'classnames';

import s from './Button.module.scss';

interface Props {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const Button: FC<Props> = ({ label, type, onClick }) => (
  <button
    type={type}
    className={cn(s.button, 'primary-text')}
    onClick={onClick}
  >
    {label}
  </button>
);
