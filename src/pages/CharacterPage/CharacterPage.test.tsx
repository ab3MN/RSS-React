import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { Mock, vi } from 'vitest';

import CharacterPage from './CharacterPage';

import characterSlice, { useGetCharacterByIdQuery } from '@/redux/slices/character.slice';

vi.mock('@/redux/slices/character.slice', async () => {
  const actual = await import('@/redux/slices/character.slice');

  return {
    ...actual,
    useGetCharacterByIdQuery: vi.fn(),
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
        <CharacterPage />
      </MemoryRouter>
    </Provider>
  );
};

describe('CharacterPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (useGetCharacterByIdQuery as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    renderWithStore();

    const loader = screen.getByTestId('loader-icon');

    expect(loader).toBeInTheDocument();
  });

  it('renders error state when there is an error', () => {
    (useGetCharacterByIdQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    renderWithStore();

    const errorMessage = screen.getByText('No Character Found');

    expect(errorMessage).toBeInTheDocument();
  });

  it('renders character data when available', () => {
    const mockCharacter = {
      id: 1,
      name: 'John Doe',
    };

    (useGetCharacterByIdQuery as Mock).mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      isError: false,
    });

    renderWithStore();

    const characterName = screen.getByText(mockCharacter.name);

    expect(characterName).toBeInTheDocument();
  });

  it('renders empty state when character is not found', () => {
    (useGetCharacterByIdQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    renderWithStore();

    const emptyMessage = screen.getByText('No Character Found');

    expect(emptyMessage).toBeInTheDocument();
  });

  it('calls API with correct characterId', () => {
    const mockCharacterId = '123';

    vi.spyOn(URLSearchParams.prototype, 'get').mockReturnValue(mockCharacterId);

    renderWithStore();

    expect(useGetCharacterByIdQuery).toHaveBeenCalledWith(mockCharacterId);
  });
});
