import { Navigate, useLocation } from 'react-router-dom';

import { PATH } from '@/constants/path';
import useLocaLStorage from '@/hooks/useLocaLStorage';
import { getSearchWith } from '@/utils/URLHelpers';

export const RedirectToCharacters = () => {
  const location = useLocation();

  const { getItem } = useLocaLStorage('search');

  const storagedSearch = getItem();

  const search = typeof storagedSearch === 'string' ? storagedSearch : null;

  const searchParams = getSearchWith(new URLSearchParams(location.search), { search });

  return <Navigate to={`${PATH.CHARACTERS}?${searchParams}`} />;
};
