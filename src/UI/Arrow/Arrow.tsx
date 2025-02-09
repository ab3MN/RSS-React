import { FC } from 'react';

import s from './Arrow.module.scss';

import ArrowIcon from '@/assets/Arrow.svg?react';

interface Props {
  direction: 'up' | 'down' | 'left' | 'right';
}

export const Arrow: FC<Props> = ({ direction }) => <ArrowIcon className={s[direction]} />;
