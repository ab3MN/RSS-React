import { Component, ReactNode } from 'react';

import s from './ErrorBoundary.module.scss';

import { Button } from '@/UI/Button/Button';
import { Container } from '@/UI/Container/Container';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, errorMessage: error.message });
  }

  handleResetError = () => {
    this.setState({ hasError: false, errorMessage: null });
  };

  render() {
    const { hasError, errorMessage } = this.state;
    const { children } = this.props;

    return hasError ?
        <Container>
          <h1
            data-testId="error-title"
            className={s.title}
          >
            {errorMessage ? errorMessage : 'Sorry.. there was an error'}
          </h1>
          <div className={s.buttonContainer}>
            <Button
              type="button"
              label="Reset Error"
              onClick={this.handleResetError}
            />
          </div>
        </Container>
      : children;
  }
}

export default ErrorBoundary;
