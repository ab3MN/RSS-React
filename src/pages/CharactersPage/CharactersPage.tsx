import { Outlet, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import s from './CharactersPage.module.scss';

import { Characters } from '@/components/Characters/Characters';
import { EmptyContainer } from '@/UI/EmptyContainer/EmptyContainer';
import { SkeletoneList } from '@/UI/Sceletones/SkeletoneList/SkeletoneList';
import { ErrorButton } from '@/components/ErrorButton/ErrorButton';
import { Container } from '@/UI/Container/Container';
import { getSearchPage } from '@/utils/getSearchPage';
import { useFetchCharacters } from '@/hooks/useFetch';

export const CharactersPage = () => {
  const { data, isLoading, error, fetchData } = useFetchCharacters();
  const [searchParams] = useSearchParams();

  const page = String(getSearchPage(searchParams.get('page')));
  const search = searchParams.get('search') || '';

  const details = searchParams.get('details');

  useEffect(() => {
    fetchData({ search, page });
  }, [search, fetchData, page]);

  const renderView = () => {
    switch (true) {
      case isLoading:
        return <SkeletoneList length={10} />;

      case (!isLoading && !data.results.length) || (!isLoading && !!error):
        return (
          <EmptyContainer
            title="No Characters Found"
            pathToImg="./not-found.png"
            alt="Not Found"
          />
        );

      default:
        return <Characters data={data} />;
    }
  };

  return (
    <div className={s.wrapper}>
      <Container style={{ flex: 1 }}>
        <div>
          {renderView()}
          <ErrorButton />
        </div>
      </Container>
      {details && <Outlet />}
    </div>
  );
};
