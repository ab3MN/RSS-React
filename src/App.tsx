import { Outlet } from 'react-router-dom';
import { shallowEqual } from 'react-redux';

import { Header } from './components/Header/Header';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { useAppSelector } from './redux/hooks';
import { cartSelector } from './redux/selectors';
import { Download } from './components/Download/Download';

export const App = () => {
  const cart = useAppSelector(cartSelector, shallowEqual);

  return (
    <>
      <Header />
      <ErrorBoundary>
        <main>
          <Outlet />

          {!!cart.items.length && <Download cart={cart} />}
        </main>
      </ErrorBoundary>
    </>
  );
};
