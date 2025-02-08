import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { CharacterItem } from './CharacterItem';

vi.mock('@/utils/URLHelpers/getIdFromUrl', () => ({
  getIdFromUrl: vi.fn().mockReturnValue('1'),
}));

vi.mock('@/utils/URLHelpers', () => ({
  getSearchWith: vi.fn().mockReturnValue('details=1'),
}));

describe('CharacterItem', () => {
  it('should render character details correctly', () => {
    const character = {
      url: 'https://swapi.dev/api/people/1/',
      name: 'Luke Skywalker',
      planet: 'Tatooine',
      hair_color: 'Blond',
      eye_color: 'Blue',
      birth_year: '19BBY',
      homeworld: '1',
      films: [],
      vehicles: [],
      starships: [],
    };

    render(
      <MemoryRouter>
        <CharacterItem character={character} />
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Blond')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();

    const img = screen.getByAltText('Luke Skywalker') as HTMLImageElement;

    expect(img.src).toContain('1.jpg');
  });
});
