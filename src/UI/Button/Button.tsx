import { FC } from 'react';
import cn from 'classnames';

import s from './Button.module.scss';

interface Props {
  label: string;
  secondaryLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  isSelected?: boolean;
  onClick?: () => void;
}

export const Button: FC<Props> = ({ label, type, onClick, isSelected, secondaryLabel }) => (
  <button
    type={type}
    className={cn(s.button, 'primary-text')}
    onClick={onClick}
    aria-pressed={isSelected}
  >
    {isSelected && secondaryLabel ? secondaryLabel : label}
  </button>
);
