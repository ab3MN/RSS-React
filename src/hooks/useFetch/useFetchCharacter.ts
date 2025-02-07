import { useFetchData } from '@/hooks/useFetch/useFetchData';
import { CharacterData } from '@/types/Characker.type';
import { getCharacterData } from '@/api/character.api';

export const useFetchCharacter = () =>
  useFetchData<CharacterData | null, string, CharacterData>(null, getCharacterData);
