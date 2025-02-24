import axios from 'axios';

import { handleRequest } from '@/utils/handleRequest';
import { Response } from '@/types/Response.type';
import { Planet } from '@/types/Planet.type';
import { BASE_URL, ENDPOINTS } from '@/constants/URL';
import { getIdFromUrl } from '@/utils/URLHelpers';

export const planetCache = new Map<string, string>();

export const getPlanet = async (homeworld: string): Promise<string> => {
  if (planetCache.has(homeworld)) return planetCache.get(homeworld)!;

  const planetId = getIdFromUrl(homeworld);

  const planet: Response<Planet> = await handleRequest(axios.get(`${BASE_URL}${ENDPOINTS.PLANET}/${planetId}`));

  planetCache.set(homeworld, planet.data.name);

  return planet.data.name;
};
