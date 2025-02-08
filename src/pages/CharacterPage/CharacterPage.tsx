import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { EmptyContainer } from '@/UI/EmptyContainer/EmptyContainer';
import { Character } from '@/components/Character/Character';
import { Loader } from '@/UI/Loader/Loader';
import { Container } from '@/UI/Container/Container';
import { useFetchCharacter } from '@/hooks/useFetch';

const CharacterPage = () => {
  const [searchParams] = useSearchParams();

  const characterId = searchParams.get('details') || '';

  const { data: character, isLoading, error, fetchData } = useFetchCharacter();

  useEffect(() => {
    if (characterId) {
      fetchData(characterId);
    }
  }, [characterId, fetchData]);

  const renderView = () => {
    switch (true) {
      case isLoading:
        return <Loader />;

      case !isLoading && !!error:
        return (
          <EmptyContainer
            title="No Characters Found"
            pathToImg="/not-found.png"
            alt="Not Found"
          />
        );

      case !isLoading && !!character:
        return (
          <Character
            character={character}
            id={Number(characterId)}
          />
        );

      default:
        return (
          <EmptyContainer
            title="No Characters Found"
            pathToImg="/not-found.png"
            alt="Not Found"
          />
        );
    }
  };

  return <Container style={{ width: '40%' }}>{renderView()}</Container>;
};

export default CharacterPage;
