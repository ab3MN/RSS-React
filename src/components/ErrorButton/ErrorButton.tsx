import { PureComponent } from 'react';

import s from './ErrorButton.module.scss';

import { Button } from '@/UI/Button/Button';

interface State {
  customError: boolean;
}

export class ErrorButton extends PureComponent<Record<string, never>, State> {
  state = { customError: false };

  handleMakeError = () => this.setState({ customError: true });

  render() {
    const { customError } = this.state;

    if (customError) {
      throw new Error('Load characters with an Error');
    }

    return (
      <div className={s.buttonContainer}>
        <Button
          label="Make an error"
          onClick={this.handleMakeError}
          type="button"
        />
      </div>
    );
  }
}
