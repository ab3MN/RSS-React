import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { vi } from 'vitest';
import configureStore from 'redux-mock-store';

import { mockCart } from './mocks/cart';
import { Download } from './components/Download/Download';

import { ThemeProvider } from '@/providers/ThemeProvider';
import { Root } from '@/Root';
import { persistor } from '@/redux/store';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({ render: vi.fn() })),
}));

const mockStore = configureStore();

describe('Application Root', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({ cartReducer: { cart: mockCart } });
    store.dispatch = vi.fn();
  });
  test('should render application correctly', () => {
    render(
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <ThemeProvider>
            <Root />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );

    expect(screen.getByText('Characters')).toBeInTheDocument();
  });

  test('should render Download', () => {
    render(
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <ThemeProvider>
            <Root />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );

    expect(
      render(
        <Provider store={store}>
          <Download cart={mockCart} />
        </Provider>
      )
    );
  });
});
