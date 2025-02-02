import { Component } from 'react';

import { Header } from '../Header/Header';
import { ErrorButton } from '../ErrorButton/ErrorButton';

import CharacterList from '@/UI/CharacterList/CharacterList';
import EmptyContainer from '@/UI/EmptyContainer/EmptyContainer';
import Container from '@/UI/Container/Container';
import { getCharactersData } from '@/api/character.api';
import { ResponseData } from '@/types/Response.type';
import { CharacterData } from '@/types/Characker.type';
import { SkeletoneList } from '@/UI/Sceletones/SkeletoneList/SkeletoneList';
import { LocalStorageUtil } from '@/utils/localeStorage';

interface State {
  data: ResponseData<CharacterData>;
  error: string | null;
  isLoading: boolean;
  prevSearch: string;
}

const initialState: State = {
  data: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  isLoading: true,
  prevSearch: '',
};

export class Characters extends Component<Record<string, never>, State> {
  state = { ...initialState, prevSearch: '' };

  componentDidMount() {
    const { getItem } = LocalStorageUtil('search');

    const search = getItem() || '';

    this.getData(search);
  }

  getData(search: string) {
    this.setState({ isLoading: true, prevSearch: search });

    getCharactersData(search)
      .then((res) => {
        if (typeof res !== 'string') {
          this.setState({ data: res, error: null });
        } else {
          this.setState({ error: res });
        }
      })
      .catch((err: Error) => {
        this.setState({ error: err.message });
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  handleSubmit = (search: string) => {
    const _search = search.trim().toLowerCase();

    if (_search !== this.state.prevSearch) {
      this.getData(_search);
    }
  };

  renderView() {
    const { isLoading, data } = this.state;

    switch (true) {
      case isLoading:
        return <SkeletoneList length={10} />;

      case !isLoading && !data.results.length:
        return (
          <EmptyContainer
            title="No Characters Found"
            pathToImg="./not-found.png"
            alt="Not Found"
          />
        );

      default:
        return <CharacterList characters={data.results} />;
    }
  }

  render() {
    return (
      <>
        <Header handleSubmit={this.handleSubmit} />
        <main>
          <Container>
            {this.renderView()}
            <ErrorButton />
          </Container>
        </main>
      </>
    );
  }
}
