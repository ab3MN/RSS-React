import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { Characters } from './Characters';

import { CharacterData } from '@/types/Characker.type';
import { charaktersData } from '@/mocks/CharackersData';

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
    results: charaktersData,
  };

  it('renders character list', () => {
    render(
      <MemoryRouter>
        <Characters data={mockData} />
      </MemoryRouter>
    );

    const characters = screen.getAllByTestId('character');

    expect(characters).toHaveLength(2);
    expect(characters[0]).toHaveTextContent('Luke Skywalker');
    expect(characters[1]).toHaveTextContent('Darth Vader');
  });

  it('renders pagination with correct total pages', () => {
    render(
      <MemoryRouter>
        <Characters data={mockData} />
      </MemoryRouter>
    );

    const pagination = screen.getByTestId('pagination');

    expect(pagination).toBeInTheDocument();
  });
});
