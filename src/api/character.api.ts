import axios from 'axios';

import { handleRequest } from '@/utils/handleRequest';
import { Response, ResponseData } from '@/types/Response.type';
import { Character, CharacterData } from '@/types/Characker.type';
import { Planet } from '@/types/Planet.type';
import { BASE_URL, ENDPOINTS } from '@/constants/URL';
import { Params } from '@/types/URL';
import { getIdFromUrl, getURLSearchParams } from '@/utils/URLHelpers';

const planetCache = new Map<string, string>();

export const getPlanet = async (homeworld: string): Promise<string> => {
  if (planetCache.has(homeworld)) return planetCache.get(homeworld)!;

  const planetId = getIdFromUrl(homeworld);

  const planet: Response<Planet> = await handleRequest(axios.get(`${BASE_URL}${ENDPOINTS.PLANET}/${planetId}`));

  planetCache.set(homeworld, planet.data.name);

  return planet.data.name;
};

export const getCharacters = async (search: string): Promise<ResponseData<Character>> => {
  const res: Response<ResponseData<Character>> = await handleRequest(
    axios.get(`${BASE_URL}${ENDPOINTS.PEOPLE}${search}`)
  );

  return res.data;
};

export const getCharactersData = async (params?: Params): Promise<ResponseData<CharacterData>> => {
  const characters = await getCharacters(`?${getURLSearchParams(params || {})}`);

  const charactersData: CharacterData[] = await Promise.all(
    characters.results.map(async (character) => ({
      ...character,
      planet: await getPlanet(character.homeworld),
    }))
  );

  return {
    ...characters,
    results: charactersData,
  };
};

export const getCharacterData = async (id: string) => {
  const res: Response<Character> = await handleRequest(axios.get(`${BASE_URL}${ENDPOINTS.PEOPLE}/${id}`));

  return { ...res.data, planet: await getPlanet(res.data.homeworld) };
};
