import { PureComponent } from 'react';

import { CharacterItem } from '../CharacterItem/CharacterItem';

import s from './CharacterList.module.scss';

import { CharacterData } from '@/types/Characker.type';

interface Props {
  characters: CharacterData[];
}

export default class CharacterList extends PureComponent<Props> {
  render() {
    return (
      <ul className={s.list}>
        {this.props.characters.map((character) => (
          <CharacterItem
            character={character}
            key={character.name}
          />
        ))}
      </ul>
    );
  }
}
