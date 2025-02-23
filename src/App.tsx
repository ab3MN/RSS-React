import { Outlet } from 'react-router-dom';

import { Header } from './components/Header/Header';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Download } from './components/Download/Download';
import { Footer } from './UI/Footer/Footer';

export const App = () => (
  <>
    <Header />
    <ErrorBoundary>
      <main>
        <Outlet />

        <Download />
      </main>

      <Footer />
    </ErrorBoundary>
  </>
);
