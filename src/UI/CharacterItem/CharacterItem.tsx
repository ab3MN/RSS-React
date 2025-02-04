import { FC } from 'react';

import s from './CharacterItem.module.scss';

import { CharacterData } from '@/types/Characker.type';
import { getIdFromUrl } from '@/utils/getIdFromUrl';

interface Props {
  character: CharacterData;
}

export const CharacterItem: FC<Props> = ({ character }) => {
  const { url, planet, name, hair_color: hair, eye_color: eye, birth_year: birthday } = character;
  const descriptions = { planet, hair, eye, birthday };
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

        {Object.entries(descriptions).map(([key, value]) => (
          <p
            className={s.description}
            key={key}
          >
            <span>{key}</span> {value}
          </p>
        ))}
      </article>
    </li>
  );
};
