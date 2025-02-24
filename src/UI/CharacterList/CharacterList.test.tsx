import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { CharacterList } from './CharacterList';

import { store } from '@/redux/store';

export const characters = [
  {
    name: 'Owen Lars',
    url: 'https://swapi.dev/api/people/6/',
    hair_color: 'brown, grey',
    eye_color: 'blue',
    birth_year: '52BBY',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/5/', 'https://swapi.dev/api/films/6/'],
    vehicles: [],
    starships: [],
    planet: 'Tatooine',
  },
  {
    name: 'Han Solo',
    hair_color: 'brown',
    eye_color: 'brown',
    birth_year: '29BBY',
    homeworld: 'https://swapi.dev/api/planets/22/',
    films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/', 'https://swapi.dev/api/films/3/'],
    vehicles: [],
    starships: ['https://swapi.dev/api/starships/10/', 'https://swapi.dev/api/starships/22/'],
    url: 'https://swapi.dev/api/people/14/',
    planet: 'Tatooine',
  },
];

describe('', () => {
  test('should renders list with items', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterList characters={characters} />
        </BrowserRouter>
      </Provider>
    );

    const item = await screen.findByTestId('character-list');

    expect(item).toBeInTheDocument();
  });
});
