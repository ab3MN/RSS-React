import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { CustomLink } from '../Link/Link';

import s from './CharacterItem.module.scss';

import { CharacterData } from '@/types/Characker.type';
import { getIdFromUrl } from '@/utils/URLHelpers/getIdFromUrl';
import { getSearchWith } from '@/utils/URLHelpers';

interface Props {
  character: CharacterData;
}

export const CharacterItem: FC<Props> = ({ character }) => {
  const { url, planet, name, hair_color: hair, eye_color: eye, birth_year: birthday } = character;
  const descriptions = { planet, hair, eye, birthday };
  const id = getIdFromUrl(url);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const path = `./?${getSearchWith(searchParams, { details: id })}`;

  return (
    <li className={s.item}>
      <article>
        <CustomLink
          path={path}
          state={{ id }}
        >
          <div className={s.imgContainer}>
            <img
              className={s.img}
              src={`../src/assets/People/${id}.jpg`}
              alt={name}
            />
          </div>
        </CustomLink>

        <h2 className={s.itemName}>
          <CustomLink
            label={name}
            path={path}
            state={{ id }}
          />
        </h2>

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
