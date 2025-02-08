import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, Mock } from 'vitest';

import CharactersPage from './CharactersPage';

import { useFetchCharacters } from '@/hooks/useFetch';

vi.mock('@/hooks/useFetch', () => ({
  useFetchCharacters: vi.fn(),
}));

describe('CharactersPage', () => {
  it('renders loading skeletons while fetching data', () => {
    (useFetchCharacters as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      fetchData: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CharactersPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('skeleton-list')).toBeInTheDocument();
  });

  it('renders "No Characters Found" when no data is returned', async () => {
    (useFetchCharacters as Mock).mockReturnValue({
      data: { results: [] },
      isLoading: false,
      error: null,
      fetchData: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CharactersPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('No Characters Found')).toBeInTheDocument();
  });

  it('renders error state when an error occurs', async () => {
    (useFetchCharacters as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: 'Something went wrong',
      fetchData: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CharactersPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('No Characters Found')).toBeInTheDocument();
  });

  it('renders Characters component when data is available', async () => {
    (useFetchCharacters as Mock).mockReturnValue({
      data: { results: [{ name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' }] },
      isLoading: false,
      error: null,
      fetchData: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CharactersPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('renders Outlet when details parameter is present', async () => {
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');

      return {
        ...actual,
        useSearchParams: vi.fn(() => [new URLSearchParams('?details=1'), vi.fn()]),
      };
    });

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Routes>
          <Route
            path="/"
            element={<CharactersPage />}
          >
            <Route
              index
              element={<div>Details Page</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Details Page')).toBeInTheDocument();
  });
});
