import { ChangeEvent, FormEvent, useCallback, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useLocaLStorage from './useLocaLStorage';

import { PATH } from '@/constants';

export const useSearch = () => {
  const [search, setSearch] = useState('');
  const [initialSearch, setInitialSearch] = useState('');
  const navigate = useNavigate();
  const { getItem, removeItem, setItem } = useLocaLStorage('search');
  const storedSearch = (getItem() as string) || '';

  useLayoutEffect(() => {
    if (storedSearch) {
      setInitialSearch(storedSearch);
    } else {
      setInitialSearch('');
    }
  }, [storedSearch]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      if (initialSearch) setInitialSearch('');
    },
    [initialSearch]
  );

  const handleClear = useCallback(() => {
    setSearch('');
    removeItem();
  }, [removeItem]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const searchValue = search === '' ? initialSearch : search.trim().toLowerCase();
      const params = searchValue ? `?page=1&search=${searchValue}` : `?page=1`;

      setItem(searchValue);
      navigate(`${PATH.CHARACTERS}${params}`);
    },
    [search, initialSearch, setItem, navigate]
  );

  return { search, handleChange, handleClear, setItem, handleSubmit, initialSearch };
};
