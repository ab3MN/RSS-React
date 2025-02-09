import { useSearchParams } from 'react-router-dom';

import { getSearchWith } from '@/utils/URLHelpers';

export const useDetailsHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const details = searchParams.get('details');

  const closeDetails = () => {
    if (details) {
      const params = getSearchWith(searchParams, { details: null });

      setSearchParams(Object.fromEntries(new URLSearchParams(params)));
    }
  };

  return { details, closeDetails, searchParams, setSearchParams };
};
