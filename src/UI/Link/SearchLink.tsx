import { Link, LinkProps, useSearchParams } from 'react-router-dom';

import s from './Link.module.scss';

import { SearchParams } from '@/types/URL';
import { getSearchWith } from '@/utils/URLHelpers';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

export const SearchLink: React.FC<Props> = ({ children, params, ...props }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={s.link}
      to={{
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
