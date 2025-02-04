import { Characters } from './components/Character/Characters';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export const App = () => (
  <ErrorBoundary>
    <Characters />
  </ErrorBoundary>
);
