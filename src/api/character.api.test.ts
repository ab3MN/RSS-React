import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';

import { getCharactersData, getCharacterData } from './character.api';

import { handleRequest } from '@/utils/handleRequest';

vi.mock('axios'); // Мокаем axios
vi.mock('@/utils/handleRequest', () => ({
  handleRequest: vi.fn(),
}));

describe('API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return character data with planet name', async () => {
    const mockCharacter = {
      name: 'Luke Skywalker',
      homeworld: 'https://swapi.dev/api/planets/1/',
    };
    const mockPlanetName = 'Tatooine';
    const mockCharacterResponse = {
      data: {
        results: [mockCharacter],
      },
    };

    (handleRequest as Mock)
      .mockResolvedValueOnce(mockCharacterResponse)
      .mockResolvedValueOnce({ data: { name: mockPlanetName } });

    const charactersData = await getCharactersData();

    expect(charactersData.results[0].name).toBe('Luke Skywalker');
    expect(charactersData.results[0].planet).toBe(mockPlanetName);
  });

  it('should return character data for single character with planet name', async () => {
    const mockCharacter = {
      name: 'Luke Skywalker',
      homeworld: 'https://swapi.dev/api/planets/1/',
    };
    const mockPlanetName = 'Tatooine';
    const mockCharacterResponse = {
      data: mockCharacter,
    };

    (handleRequest as Mock)
      .mockResolvedValueOnce(mockCharacterResponse)
      .mockResolvedValueOnce({ data: { name: mockPlanetName } });
    const characterData = await getCharacterData('1');

    expect(characterData.name).toBe('Luke Skywalker');
    expect(characterData.planet).toBe(mockPlanetName);
  });
});
