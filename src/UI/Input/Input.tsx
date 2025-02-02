import { Component, ChangeEvent } from 'react';

import s from './Input.module.scss';

interface Props {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export class Input extends Component<Props> {
  render() {
    const { handleChange, value } = this.props;

    return (
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={handleChange}
        className={s.input}
      />
    );
  }
}
