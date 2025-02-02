import { Component, ChangeEvent, FormEvent } from 'react';

import { IconButton } from '../IconButton/IconButton';

import s from './SearchForm.module.scss';

import Close from '@/assets/Close.svg?react';
import Search from '@/assets/Search.svg?react';

interface Props {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export class SearchForm extends Component<Props> {
  render() {
    const { handleChange, value, handleClear, handleSubmit } = this.props;

    return (
      <form
        className={s.container}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={handleChange}
          className={s.input}
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
  }
}
