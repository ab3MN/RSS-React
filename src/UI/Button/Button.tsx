import { Component } from 'react';
import cn from 'classnames';

import s from './Button.module.scss';

interface Props {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export class Button extends Component<Props> {
  render() {
    const { label, onClick, type = 'button' } = this.props;

    return (
      <button
        type={type}
        className={cn(s.button, 'primary-text')}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
}
