import { ChangeEvent, FormEvent, useLayoutEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import useLocaLStorage from './useLocaLStorage';

import { getSearchWith } from '@/utils/URLHelpers';

export const useSearch = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { getItem, removeItem, setItem } = useLocaLStorage('search');
  const storedSearch = (getItem() as string) || '';

  const [searchParams] = useSearchParams();

  useLayoutEffect(() => {
    setSearch(storedSearch);
  }, [storedSearch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClear = () => {
    setSearch('');
    removeItem();
    navigate({ search: '' });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const path = getSearchWith(searchParams, { search });

    if (search.trim()) {
      navigate(`?${path}`);
    }
  };

  return { search, handleChange, handleClear, setItem, handleSubmit };
};
