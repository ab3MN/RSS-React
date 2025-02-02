import { Component } from 'react';

import s from './CharacterItem.module.scss';

import { CharacterData } from '@/types/Characker.type';
import { getIdFromUrl } from '@/utils/getIdFromUrl';

interface Props {
  character: CharacterData;
}

export class CharacterItem extends Component<Props> {
  render() {
    const { character } = this.props;
    const { url, planet, name, hair_color, eye_color, birth_year } = character;

    const id = getIdFromUrl(url);

    return (
      <li className={s.item}>
        <article>
          <img
            className={s.itemImg}
            src={`./People/${id}.jpg`}
            alt={name}
          />
          <h2 className={s.itemName}>{name}</h2>
          <h4 className={s.itemPlanet}>{planet || 'Unknown Planet'}</h4>
          <p className={s.itemDescription}>
            <span>Hair:</span> {hair_color}
          </p>
          <p className={s.itemDescription}>
            <span>Eye:</span> {eye_color}
          </p>
          <p className={s.itemDescription}>
            <span>Birthday:</span> {birth_year}
          </p>
        </article>
      </li>
    );
  }
}
