import { Link, LinkProps, useSearchParams } from 'react-router-dom';

import s from './Link.module.scss';

import { SearchParams } from '@/types/URL';
import { getSearchWith } from '@/utils/URLHelpers';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  style?: { [key: string]: string };
};

export const SearchLink: React.FC<Props> = ({ children, params, style = {}, ...props }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={s.link}
      style={style}
      to={{ search: getSearchWith(searchParams, params) }}
      {...props}
    >
      {children}
    </Link>
  );
};
