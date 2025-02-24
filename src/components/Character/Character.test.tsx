import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { Character } from './Character';

import { characterData } from '@/mocks/CharackersData';

describe('Character component', () => {
  it('renders character name', () => {
    render(
      <MemoryRouter>
        <Character
          character={characterData}
          id={1}
        />
      </MemoryRouter>
    );

    const nameElement = screen.getByText('Luke Skywalker');

    expect(nameElement).toBeInTheDocument();
  });

  it('renders character descriptions', () => {
    render(
      <MemoryRouter>
        <Character
          character={characterData}
          id={1}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Blond')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
  });

  it('renders character image with correct src and alt', () => {
    render(
      <MemoryRouter>
        <Character
          character={characterData}
          id={1}
        />
      </MemoryRouter>
    );

    const image = screen.getByRole('img', { name: 'Luke Skywalker' });

    expect(image).toHaveAttribute('src', '/People/1.jpg');
    expect(image).toHaveAttribute('alt', 'Luke Skywalker');
  });
});
