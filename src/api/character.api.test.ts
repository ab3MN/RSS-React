import { describe, test, expect, vi, Mock } from 'vitest';

import { getPlanet, planetCache } from './character.api';

import { handleRequest } from '@/utils/handleRequest';
import { characterData } from '@/mocks/CharackersData';

const setSpy = vi.spyOn(planetCache, 'set');
const getSpy = vi.spyOn(planetCache, 'get');

vi.mock('axios');
vi.mock('@/utils/handleRequest', () => ({
  handleRequest: vi.fn(),
}));

describe('getPlanet', () => {
  let mockPlanet: unknown;

  beforeEach(() => {
    mockPlanet = { data: { name: characterData.planet } };
    planetCache.clear();
  });
  test('should fetch and return planet name', async () => {
    (handleRequest as Mock).mockResolvedValue(mockPlanet);

    const result = await getPlanet(characterData.homeworld);

    expect(result).toBe(characterData.planet);
  });

  test('should return cached planet name if available', async () => {
    (handleRequest as Mock).mockResolvedValue({ data: { name: characterData.planet } });

    await getPlanet(characterData.homeworld);
    await getPlanet(characterData.homeworld);

    expect(getSpy).toHaveBeenCalledWith(characterData.homeworld);
    expect(setSpy).toHaveBeenCalledWith(characterData.homeworld, characterData.planet);

    expect(handleRequest).toHaveBeenCalledTimes(1);
    getSpy.mockRestore();
    setSpy.mockRestore();
  });

  test('should throw an error if request fails', async () => {
    (handleRequest as Mock).mockRejectedValue(new Error('Network error'));

    await expect(getPlanet('https://swapi.dev/api/planets/3/')).rejects.toThrow('Network error');
  });
});
