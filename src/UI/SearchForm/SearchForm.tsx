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
    aria-label="Search form"
  >
    <Input
      handleChange={handleChange}
      value={value}
    />

    <IconButton
      type="submit"
      style={{ width: '30px' }}
      aria-label="Search"
    >
      <Search fill="#313237" />
    </IconButton>

    <IconButton
      style={{ width: '30px' }}
      onClick={handleClear}
      aria-label="Clear"
    >
      <Close fill="#313237" />
    </IconButton>
  </form>
);
