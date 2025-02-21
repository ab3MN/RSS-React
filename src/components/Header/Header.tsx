import s from './Header.module.scss';

import { CustomLink } from '@/UI/Link/Link';
import { SearchForm } from '@/UI/SearchForm/SearchForm';
import Logo from '@/assets/Logo.svg?react';
import { PATH } from '@/constants/path';
import { useSearch } from '@/hooks/useSearch';
import NavigationLink from '@/UI/NavLink/NavigationLink';

export const Header = () => {
  const { search, handleChange, handleClear, handleSubmit, initialSearch } = useSearch();

  const value = search ? search : initialSearch;

  return (
    <header className={s.container}>
      <div className={s.menu}>
        <CustomLink path={PATH.HOME}>
          <h1
            className={s.logo}
            onClick={handleClear}
          >
            <Logo />
          </h1>
        </CustomLink>
        <NavigationLink
          to={PATH.CHARACTERS}
          label="Characters"
        />
        <NavigationLink
          to={PATH.CART}
          label="Cart"
        />
      </div>

      <div className={s.search}>
        <SearchForm
          handleChange={handleChange}
          handleClear={handleClear}
          handleSubmit={handleSubmit}
          value={value}
        />
      </div>
    </header>
  );
};
