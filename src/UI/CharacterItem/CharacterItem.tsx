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
          <div className={s.imgContainer}>
            <img
              className={s.img}
              src={`./People/${id}.jpg`}
              alt={name}
            />
          </div>

          <h2 className={s.itemName}>{name}</h2>
          <h4 className={s.itemPlanet}>{planet !== 'unknown' ? planet : 'Unknown Planet'}</h4>
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
