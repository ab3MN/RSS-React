import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';

import s from './Header.module.scss';

import { SearchForm } from '@/UI/SearchForm/SearchForm';
import { LocalStorageUtil } from '@/utils/localeStorage';
import Logo from '@/assets/Logo.svg?react';

const { getItem, setItem, removeItem } = LocalStorageUtil('search');

interface Props {
  handleSubmit: (search: string) => void;
}

export const Header: FC<Props> = ({ handleSubmit }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const storedSearch = getItem();

    if (storedSearch) setSearch(storedSearch);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClear = () => {
    setSearch('');
    removeItem();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItem(search);
    handleSubmit(search.trim().toLowerCase());
  };

  return (
    <header className={s.container}>
      <h1 className={s.logo}>
        <Logo />
      </h1>
      <div className={s.search}>
        <SearchForm
          handleChange={handleChange}
          handleClear={handleClear}
          handleSubmit={onSubmit}
          value={search}
        />
      </div>
    </header>
  );
};
