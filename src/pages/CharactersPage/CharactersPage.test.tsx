import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { Mock, vi } from 'vitest';

import CharactersPage from './CharactersPage';

import characterSlice, { useGetCharactersQuery } from '@/redux/slices/character.slice';

vi.mock('@/redux/slices/character.slice', async () => {
  const actual = await import('@/redux/slices/character.slice');

  return {
    ...actual,
    useGetCharactersQuery: vi.fn(),
  };
});

const renderWithStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      [characterSlice.reducerPath]: characterSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(characterSlice.middleware),
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <CharactersPage />
      </MemoryRouter>
    </Provider>
  );
};

describe('CharactersPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    renderWithStore();

    expect(screen.getByTestId('skeleton-list')).toBeInTheDocument();
  });

  it('renders "No Characters Found" on error', async () => {
    (useGetCharactersQuery as unknown as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    renderWithStore();

    expect(await screen.findByText('No Characters Found')).toBeInTheDocument();
  });
});
