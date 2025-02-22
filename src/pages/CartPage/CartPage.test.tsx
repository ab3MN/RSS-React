import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { vi } from 'vitest';

import CartPage from './CartPage';

import { charaktersData } from '@/mocks/CharackersData';

vi.mock('@/redux/slices', () => ({
  clearCart: vi.fn(),
}));

const mockStore = configureStore();

describe('CartPage component', () => {
  it('renders NotFoundPage when cart is empty', () => {
    const store = mockStore({
      cartReducer: {
        cart: {
          items: [],
          quantity: 0,
        },
      },
    });

    store.dispatch = vi.fn();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CartPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('The Cart is empty')).toBeInTheDocument();
  });

  it(`renders Cart when cart isn't empty`, () => {
    const store = mockStore({
      cartReducer: {
        cart: {
          items: charaktersData,
          quantity: 0,
        },
      },
    });

    store.dispatch = vi.fn();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CartPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });
});
