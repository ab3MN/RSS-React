import { ChangeEvent, FC } from 'react';

import s from './Input.module.scss';

interface Props {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = ({ handleChange, value }) => (
  <input
    type="text"
    placeholder="Search"
    value={value}
    onChange={handleChange}
    className={s.input}
  />
);
