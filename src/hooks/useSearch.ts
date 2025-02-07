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
    if (storedSearch) {
      setSearch(storedSearch);
      const path = getSearchWith(searchParams, { search: storedSearch });

      navigate(`?${path}`);
    }
  }, [storedSearch, navigate, search, searchParams]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setItem(event.target.value);
  };

  const handleClear = () => {
    setSearch('');
    removeItem();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchQuery = search.trim().toLowerCase();

    if (searchQuery) {
      setItem(searchQuery);
      navigate(`?page=1&search=${search}`);
    }
  };

  return { search, handleChange, handleClear, setItem, handleSubmit };
};
