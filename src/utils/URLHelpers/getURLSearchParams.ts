import { Params } from '@/types/URL';

export const getURLSearchParams = (params: Params) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });

  return searchParams.toString();
};
