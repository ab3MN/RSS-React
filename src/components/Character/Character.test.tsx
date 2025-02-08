import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Character } from './Character';

import { CharacterData } from '@/types/Characker.type';

describe('Character component', () => {
  const mockCharacter: CharacterData = {
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
  };

  it('renders character name', () => {
    render(
      <Character
        character={mockCharacter}
        id={1}
      />
    );

    const nameElement = screen.getByText('Luke Skywalker');

    expect(nameElement).toBeInTheDocument();
  });

  it('renders character descriptions', () => {
    render(
      <Character
        character={mockCharacter}
        id={1}
      />
    );

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Blond')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
  });

  it('renders character image with correct src and alt', () => {
    render(
      <Character
        character={mockCharacter}
        id={1}
      />
    );

    const image = screen.getByRole('img', { name: 'Luke Skywalker' });

    expect(image).toHaveAttribute('src', '../src/assets/People/1.jpg');
    expect(image).toHaveAttribute('alt', 'Luke Skywalker');
  });
});
