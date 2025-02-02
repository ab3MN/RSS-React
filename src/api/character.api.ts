import axios from 'axios';

import { handleRequest } from '@/utils/handleRequest';
import { Response, ResponseData } from '@/types/Response.type';
import { Character, CharacterData } from '@/types/Characker.type';
import { Planet } from '@/types/Planet.type';
import { BASE_URL, ENDPOINTS } from '@/constants/URL';
import { getIdFromUrl } from '@/utils/getIdFromUrl';

export const getPlanet = async (homeworld: string): Promise<string> => {
  const planetId = getIdFromUrl(homeworld);

  const planet: Response<Planet> = await handleRequest(axios.get(`${BASE_URL}${ENDPOINTS.PLANET}/${planetId}`));

  return planet.data.name;
};

export const getCharacters = async (search: string): Promise<ResponseData<Character>> => {
  const res: Response<ResponseData<Character>> = await handleRequest(
    axios.get(`${BASE_URL}${ENDPOINTS.PEOPLE}${search}`)
  );

  return res.data;
};

export const getCharactersData = async (name?: string): Promise<ResponseData<CharacterData>> => {
  const search = name ? `?search=${name}` : '';

  const charactersData = await getCharacters(search);

  const charactersWithPlanets: CharacterData[] = await Promise.all(
    charactersData.results.map(async (character) => ({
      ...character,
      planet: await getPlanet(character.homeworld),
    }))
  );

  return {
    ...charactersData,
    results: charactersWithPlanets,
  };
};
