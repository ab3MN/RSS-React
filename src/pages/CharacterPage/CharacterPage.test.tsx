import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, useSearchParams } from 'react-router-dom';

import CharacterPage from './CharacterPage';

import { useFetchCharacter } from '@/hooks/useFetch';

vi.mock('@/hooks/useFetch');

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');

  return {
    ...actual,
    useSearchParams: vi.fn(() => [new URLSearchParams(''), vi.fn()]),
  };
});

describe('CharacterPage', () => {
  it('does not fetch data when characterId is empty', () => {
    const fetchDataMock = vi.fn();

    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams(''), vi.fn()]);
    vi.mocked(useFetchCharacter).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      fetchData: fetchDataMock,
    });

    render(
      <MemoryRouter>
        <CharacterPage />
      </MemoryRouter>
    );

    expect(fetchDataMock).not.toHaveBeenCalled();
  });

  it('renders loader when loading', () => {
    vi.mocked(useFetchCharacter).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      fetchData: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CharacterPage />
      </MemoryRouter>
    );

    const loaderIcon = screen.getByTestId('loader-icon');

    expect(loaderIcon).toBeInTheDocument();
  });

  it('renders EmptyContainer when there is an error', () => {
    vi.mocked(useFetchCharacter).mockReturnValue({
      data: null,
      isLoading: false,
      error: 'Error',
      fetchData: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CharacterPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /no characters found/i })).toBeInTheDocument();
  });

  it('renders Character when data is available', () => {
    vi.mocked(useFetchCharacter).mockReturnValue({
      data: {
        name: 'Luke Skywalker',
        planet: 'Tatooine',
        hair_color: 'Blond',
        eye_color: 'Blue',
        birth_year: '19BBY',
        url: 'https://swapi.dev/api/people/1/',
        homeworld: 'Tatooine',
        films: [],
        vehicles: [],
        starships: [],
      },
      isLoading: false,
      error: null,
      fetchData: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CharacterPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });
});
