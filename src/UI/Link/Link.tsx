import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import s from './Link.module.scss';

interface Props {
  path: string;
  label?: string;
  children?: ReactNode;
  state?: unknown;
  style?: { [key: string]: string };
}

export const CustomLink: FC<Props> = ({ path, label, children, state, style = {} }) => (
  <Link
    className={s.link}
    to={path}
    state={state}
    style={style}
  >
    {children ? children : label}
  </Link>
);
