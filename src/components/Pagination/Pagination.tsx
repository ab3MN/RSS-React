import cn from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import s from './Pagination.module.scss';

import { Arrow } from '@/UI/Arrow/Arrow';
import { SearchLink } from '@/UI/Link/SearchLink';
import { getSearchPage } from '@/utils/getSearchPage';

interface IPagination {
  totalPage: number;
}

export const Pagination: FC<IPagination> = ({ totalPage }) => {
  const [searchParams] = useSearchParams();

  const page = getSearchPage(searchParams.get('page'));

  return (
    <ul className={s.list}>
      <li
        className={cn(s.item, s.link, { [s.disabled]: page === 1 })}
        data-testid="prev"
      >
        <SearchLink params={{ page: String(page - 1) }}>
          <Arrow direction="left" />
        </SearchLink>
      </li>

      <p className={cn(s.item, s.page)}>{page}</p>

      <li
        className={cn(s.item, s.link, { [s.disabled]: page === totalPage })}
        data-testid="next"
      >
        <SearchLink params={{ page: String(page + 1) }}>
          <Arrow direction="right" />
        </SearchLink>
      </li>
    </ul>
  );
};
