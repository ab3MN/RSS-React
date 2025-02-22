import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';

import { CharacterItem } from './CharacterItem';

import { store } from '@/redux/store';
import { characterData } from '@/mocks/CharackersData';

vi.mock('@/utils/URLHelpers/getIdFromUrl', () => ({
  getIdFromUrl: vi.fn().mockReturnValue('1'),
}));

vi.mock('@/utils/URLHelpers', () => ({
  getSearchWith: vi.fn().mockReturnValue('details=1'),
}));

describe('CharacterItem', () => {
  it('should render character details correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterItem character={characterData} />
        </MemoryRouter>{' '}
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Blond')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();

    const img = screen.getByAltText('Luke Skywalker') as HTMLImageElement;

    expect(img.src).toContain('1.jpg');
  });

  it('should add item to Cart', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterItem character={characterData} />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByText('Add to Cart');

    fireEvent.click(button);

    expect(screen.getByText('Added to Cart')).toBeInTheDocument();
  });
});
