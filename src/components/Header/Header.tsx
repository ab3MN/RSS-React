import s from './Header.module.scss';

import { SearchForm } from '@/UI/SearchForm/SearchForm';
import Logo from '@/assets/Logo.svg?react';
import { useSearch } from '@/hooks/useSearch';

export const Header = () => {
  const { search, handleChange, handleClear, handleSubmit } = useSearch();

  return (
    <header className={s.container}>
      <h1 className={s.logo}>
        <Logo />
      </h1>
      <div className={s.search}>
        <SearchForm
          handleChange={handleChange}
          handleClear={handleClear}
          handleSubmit={handleSubmit}
          value={search}
        />
      </div>
    </header>
  );
};
