import { Outlet, useSearchParams } from 'react-router-dom';

import s from './CharactersPage.module.scss';

import { Characters } from '@/components/Characters/Characters';
import { EmptyContainer } from '@/UI/EmptyContainer/EmptyContainer';
import { SkeletoneList } from '@/UI/Sceletones/SkeletoneList/SkeletoneList';
import { Container } from '@/UI/Container/Container';
import { getSearchPage } from '@/utils/getSearchPage';
import { getURLSearchParams } from '@/utils/URLHelpers';
import { useGetCharactersQuery } from '@/redux/slices';

const CharactersPage = () => {
  const [searchParams] = useSearchParams();
  const page = String(getSearchPage(searchParams.get('page')));
  const search = searchParams.get('search') || '';
  const details = searchParams.get('details');

  const { data, isLoading, isError } = useGetCharactersQuery(getURLSearchParams({ search, page }));

  const renderView = () => {
    switch (true) {
      case isLoading:
        return (
          <div data-testid="skeleton-list">
            <SkeletoneList length={10} />
          </div>
        );

      case (!isLoading && !!isError) || !data?.results.length:
        return (
          <EmptyContainer
            title="No Characters Found"
            pathToImg="/not-found.png"
            alt="Not Found"
          />
        );

      case !isLoading && !!data: {
        return <Characters data={data} />;
      }

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

  return (
    <div className={s.wrapper}>
      <Container style={{ flex: 1 }}>
        <div>{renderView()}</div>
      </Container>
      {details && <Outlet />}
    </div>
  );
};

export default CharactersPage;
