import { useCallback, useState } from 'react';

import { handleError } from '@/utils/handleError';

export const useFetchData = <T, P, R extends T | string>(initialState: T, fetchDataFn: (param: P) => Promise<R>) => {
  const [data, setData] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const fetchData = useCallback(
    async (param: P) => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetchDataFn(param);

        if (typeof res !== 'string') {
          setData(res as T);
        } else {
          setError(res);
        }
      } catch (err) {
        setError(handleError(err));
      } finally {
        setIsLoading(false);
      }
    },
    [fetchDataFn]
  );

  return { data, isLoading, error, fetchData };
};
