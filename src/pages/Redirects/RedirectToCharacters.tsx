import { Navigate, useLocation } from 'react-router-dom';

import { PATH } from '@/constants/path';

export const RedirectToCharacters = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return <Navigate to={`${PATH.CHARACTERS}?${searchParams.toString()}`} />;
};
