import { describe, expect, test } from 'vitest';

import { getCharactersFileData } from '@/utils/getCharactersFileData';
import { charaktersData } from '@/mocks/CharackersData';

describe('getCharactersFileData', () => {
  test('should generate correct file data string', () => {
    const result = getCharactersFileData(charaktersData);

    expect(result).toContain('1.Character: Luke Skywalker');
    expect(result).toContain('Hair: Blond');
    expect(result).toContain('Eye: Blue');
    expect(result).toContain('Birthday: 19BBY');
    expect(result).toContain('Homeworld: Tatooine');
    expect(result).toContain('Details : https://swapi.dev/api/people/1/');
    expect(result).toContain('2.Character: Darth Vader');
    expect(result).toContain('Hair: unknown');
    expect(result).toContain('Eye: Yellow');
    expect(result).toContain('Birthday: 41.9BBY');
    expect(result).toContain('Homeworld: Tatooine');
    expect(result).toContain('Details : https://swapi.dev/api/people/4/');
  });

  test('should return correct header when no characters provided', () => {
    const result = getCharactersFileData([]);

    expect(result).toBe('Selected characters:\n \n');
  });
});
