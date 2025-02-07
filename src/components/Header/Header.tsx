import s from './Header.module.scss';

import { CustomLink } from '@/UI/Link/Link';
import { SearchForm } from '@/UI/SearchForm/SearchForm';
import Logo from '@/assets/Logo.svg?react';
import { PATH } from '@/constants/path';
import { useSearch } from '@/hooks/useSearch';

export const Header = () => {
  const { search, handleChange, handleClear, handleSubmit } = useSearch();

  return (
    <header className={s.container}>
      <CustomLink
        path={PATH.HOME}
        style={{ justifyContent: 'start' }}
      >
        <h1
          className={s.logo}
          onClick={handleClear}
        >
          <Logo />
        </h1>
      </CustomLink>

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
