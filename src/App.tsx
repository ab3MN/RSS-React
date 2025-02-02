import { PureComponent } from 'react';

import { Characters } from './components/Character/Characters';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export class App extends PureComponent {
  render() {
    return (
      <ErrorBoundary>
        <Characters />
      </ErrorBoundary>
    );
  }
}
