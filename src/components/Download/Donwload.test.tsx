import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from 'redux-mock-store';
import { vi } from 'vitest';

import { Download } from './Download';

import { clearCart } from '@/redux/slices';
import { mockCart } from '@/mocks/cart';

vi.mock('@/redux/slices', () => ({
  clearCart: vi.fn(),
}));

const mockStore = configureStore();

describe('Download component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeAll(() => {
    global.URL.createObjectURL = vi.fn();
  });

  beforeEach(() => {
    store = mockStore({ cartReducer: { cart: mockCart } });
    store.dispatch = vi.fn();
  });

  it('renders the correct number of selected items', () => {
    render(
      <Provider store={store}>
        <Download />
      </Provider>
    );

    expect(screen.getByText('Selected: 2 items')).toBeInTheDocument();
  });

  it('dispatches clearCart action on "Unselect all" button click', () => {
    render(
      <Provider store={store}>
        <Download />
      </Provider>
    );

    const unselectButton = screen.getByText('Unselect all');

    fireEvent.click(unselectButton);

    expect(store.dispatch).toHaveBeenCalledWith(clearCart());
  });

  it('sets the correct download link on "Download" button click', () => {
    render(
      <Provider store={store}>
        <Download />
      </Provider>
    );

    const downloadLink = screen.getByText('Download');

    fireEvent.click(downloadLink);

    expect(downloadLink).toHaveAttribute('download', '2_StarWars_Characters.csv');
  });
});
