import { useEffect, useState } from 'react';

import { Header } from '../Header/Header';
import { ErrorButton } from '../ErrorButton/ErrorButton';

import { CharacterList } from '@/UI/CharacterList/CharacterList';
import { EmptyContainer } from '@/UI/EmptyContainer/EmptyContainer';
import { Container } from '@/UI/Container/Container';
import { getCharactersData } from '@/api/character.api';
import { SkeletoneList } from '@/UI/Sceletones/SkeletoneList/SkeletoneList';
import useLocaLStorage from '@/hooks/useLocaLStorage';
import { ResponseData } from '@/types/Response.type';
import { CharacterData } from '@/types/Characker.type';
import { handleError } from '@/utils/handleError';

export const Characters = () => {
  const [characters, setCharacters] = useState<ResponseData<CharacterData>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [prevSearch, setPrevSearch] = useState('');

  const { getItem } = useLocaLStorage('search');
  const search = getItem() as string;

  const getData = async (search: string) => {
    setIsLoading(true);

    try {
      const res = await getCharactersData(search);

      if (typeof res !== 'string') {
        setCharacters(res);
      } else {
        setError(res);
      }
    } catch (err: unknown) {
      setError(handleError(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(search);
  }, [search]);

  const handleSubmit = (search: string) => {
    if (search !== prevSearch) setPrevSearch(search);
  };

  const renderView = () => {
    switch (true) {
      case isLoading:
        return <SkeletoneList length={10} />;

      case !isLoading && !!error:
        throw new Error(error);

      case !isLoading && !characters.results.length:
        return (
          <EmptyContainer
            title="No Characters Found"
            pathToImg="./not-found.png"
            alt="Not Found"
          />
        );

      default:
        return <CharacterList characters={characters.results} />;
    }
  };

  return (
    <>
      <Header handleSubmit={handleSubmit} />
      <main>
        <Container>
          {renderView()}
          <ErrorButton />
        </Container>
      </main>
    </>
  );
};
