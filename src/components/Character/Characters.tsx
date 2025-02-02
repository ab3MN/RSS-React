import { PureComponent } from 'react';

import { Header } from '../Header/Header';

import s from './Characters.module.scss';

import CharacterList from '@/UI/CharacterList/CharacterList';
import EmptyContainer from '@/UI/EmptyContainer/EmptyContainer';
import Container from '@/UI/Container/Container';
import { getCharactersData } from '@/api/character.api';
import { ResponseData } from '@/types/Response.type';
import { CharacterData } from '@/types/Characker.type';
import { SkeletoneList } from '@/UI/Sceletones/SkeletoneList/SkeletoneList';
import { Button } from '@/UI/Button/Button';

interface State {
  data: ResponseData<CharacterData>;
  error: string | null;
  customError: boolean;
  isLoading: boolean;
}

const initialState: State = {
  data: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  customError: false,
  isLoading: true,
};

export class Characters extends PureComponent<Record<string, never>, State> {
  state = initialState;

  componentDidMount() {
    this.getData('');
  }

  getData(search: string) {
    this.setState({ isLoading: true });

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
      .finally(() => setTimeout(() => this.setState({ isLoading: false }), 100));
  }

  handleSubmit = (search: string) => {
    this.getData(search.trim().toLowerCase());
  };

  handleMakeError = () => {
    this.setState({ customError: true });
  };

  renderView() {
    const { isLoading, data, customError } = this.state;

    if (customError) {
      throw new Error('Load characters with an Error');
    }

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
        <Container>
          {this.renderView()}

          <div className={s.buttonContainer}>
            <Button
              label="Make an error"
              onClick={this.handleMakeError}
              type="button"
            />
          </div>
        </Container>
      </>
    );
  }
}
