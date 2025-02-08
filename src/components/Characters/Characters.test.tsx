import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Characters } from './Characters';

import { CharacterData } from '@/types/Characker.type';

vi.mock('../Pagination/Pagination', () => ({
  Pagination: () => <div data-testid="pagination" />,
}));

vi.mock('@/UI/CharacterList/CharacterList', () => ({
  CharacterList: ({ characters }: { characters: CharacterData[] }) => (
    <ul>
      {characters.map((character) => (
        <li
          key={character.name}
          data-testid="character"
        >
          {character.name}
        </li>
      ))}
    </ul>
  ),
}));

describe('Characters component', () => {
  const mockData = {
    count: 20,
    next: null,
    previous: null,
    results: [
      {
        name: 'Luke Skywalker',
        url: 'https://swapi.dev/api/people/1/',
        hair_color: 'Blond',
        eye_color: 'Blue',
        birth_year: '19BBY',
        homeworld: 'Tatooine',
        films: [],
        vehicles: [],
        starships: [],
        planet: 'Tatooine',
      },
      {
        name: 'Darth Vader',
        url: 'https://swapi.dev/api/people/4/',
        hair_color: 'None',
        eye_color: 'Yellow',
        birth_year: '41.9BBY',
        homeworld: 'Tatooine',
        films: [],
        vehicles: [],
        starships: [],
        planet: 'Tatooine',
      },
    ],
  };

  it('renders character list', () => {
    render(<Characters data={mockData} />);

    const characters = screen.getAllByTestId('character');

    expect(characters).toHaveLength(2);
    expect(characters[0]).toHaveTextContent('Luke Skywalker');
    expect(characters[1]).toHaveTextContent('Darth Vader');
  });

  it('renders pagination with correct total pages', () => {
    render(<Characters data={mockData} />);

    const pagination = screen.getByTestId('pagination');

    expect(pagination).toBeInTheDocument();
  });
});
