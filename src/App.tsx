import { Outlet } from 'react-router-dom';

import { Header } from './components/Header/Header';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Download } from './components/Download/Download';

export const App = () => (
  <>
    <Header />
    <ErrorBoundary>
      <main>
        <Outlet />

        <Download />
      </main>
    </ErrorBoundary>
  </>
);
