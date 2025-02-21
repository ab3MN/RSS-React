import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Character, CharacterData } from '@/types/Characker.type';
import { ResponseData } from '@/types/Response.type';
import { BASE_URL, ENDPOINTS } from '@/constants/URL';
import { getPlanet } from '@/api/character.api';

const characterSlice = createApi({
  reducerPath: 'characters',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  endpoints: (builder) => ({
    getCharacters: builder.query<ResponseData<CharacterData>, string>({
      query: (search) => `/${ENDPOINTS.PEOPLE}?${search}`,

      transformResponse: async (response: ResponseData<Character>) => ({
        ...response,
        results: await Promise.all(
          response.results.map(async (character) => ({
            ...character,
            planet: await getPlanet(character.homeworld),
          }))
        ),
      }),
    }),

    getCharacterById: builder.query<CharacterData, string>({
      query: (id) => `${ENDPOINTS.PEOPLE}/${id}`,
      transformResponse: async (response: Character) => ({
        ...response,
        planet: await getPlanet(response.homeworld),
      }),
    }),
  }),
});

export default characterSlice;

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = characterSlice;
