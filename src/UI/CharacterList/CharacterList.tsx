import { FC } from 'react';

import { CharacterItem } from '../CharacterItem/CharacterItem';

import s from './CharacterList.module.scss';

import { CharacterData } from '@/types/Characker.type';

interface Props {
  characters: CharacterData[];
}

export const CharacterList: FC<Props> = ({ characters }) => (
  <ul
    className={s.list}
    data-testid="character-list"
  >
    {characters.map((character) => (
      <CharacterItem
        character={character}
        key={character.name}
      />
    ))}
  </ul>
);
