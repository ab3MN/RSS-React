import { PureComponent, ReactNode } from 'react';

import s from './IconButton.module.scss';

interface Props {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  width?: string;
  height?: string;
}

export class IconButton extends PureComponent<Props> {
  render() {
    const { onClick, children, width, height, type = 'button' } = this.props;

    return (
      <button
        className={s.iconButton}
        type={type}
        onClick={onClick}
        style={{ width, height }}
      >
        {children}
      </button>
    );
  }
}
