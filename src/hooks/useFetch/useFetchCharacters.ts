import { useFetchData } from '@/hooks/useFetch/useFetchData';
import { ResponseData } from '@/types/Response.type';
import { CharacterData } from '@/types/Characker.type';
import { getCharactersData } from '@/api/character.api';
import { Params } from '@/types/URL';

export const useFetchCharacters = () =>
  useFetchData<ResponseData<CharacterData>, Params, ResponseData<CharacterData>>(
    { count: 0, next: null, previous: null, results: [] },
    getCharactersData
  );
