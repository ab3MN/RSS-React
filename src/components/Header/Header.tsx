import { ChangeEvent, FormEvent, PureComponent, ReactNode } from 'react';

import s from './Header.module.scss';

import { SearchForm } from '@/UI/SearchForm/SearchForm';
import { LocalStorageUtil } from '@/utils/localeStorage';
import Logo from '@/assets/Logo.svg?react';

const { getItem, setItem, removeItem } = LocalStorageUtil('search');

interface Props {
  handleSubmit: (search: string) => void;
}

interface State {
  search: string;
}

export class Header extends PureComponent<Props, State> {
  state: State = {
    search: '',
  };

  componentDidMount() {
    const search = getItem();

    if (search) this.setState({ search });
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
  };

  handleClear = () => {
    this.setState({ search: '' });
    removeItem();
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setItem(this.state.search);
    this.props.handleSubmit(this.state.search);
  };

  render(): ReactNode {
    return (
      <header className={s.container}>
        <h1 className={s.logo}>
          <Logo />
        </h1>

        <div className={s.search}>
          <SearchForm
            handleChange={this.handleChange}
            handleClear={this.handleClear}
            handleSubmit={this.handleSubmit}
            value={this.state.search}
          />
        </div>
      </header>
    );
  }
}
