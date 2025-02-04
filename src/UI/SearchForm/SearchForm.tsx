import { ChangeEvent, FormEvent, FC } from 'react';

import { IconButton } from '../IconButton/IconButton';
import { Input } from '../Input/Input';

import s from './SearchForm.module.scss';

import Close from '@/assets/Close.svg?react';
import Search from '@/assets/Search.svg?react';

interface Props {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const SearchForm: FC<Props> = ({ handleChange, value, handleClear, handleSubmit }) => (
  <form
    className={s.form}
    onSubmit={handleSubmit}
  >
    <Input
      handleChange={handleChange}
      value={value}
    />

    <IconButton
      type="submit"
      width="30px"
    >
      <Search fill="#313237" />
    </IconButton>

    <IconButton
      width="30px"
      onClick={handleClear}
    >
      <Close fill="#313237" />
    </IconButton>
  </form>
);
