import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { shallowEqual, useDispatch } from 'react-redux';

import { CustomLink } from '../Link/Link';

import s from './CharacterItem.module.scss';

import { CharacterData } from '@/types/Characker.type';
import { getIdFromUrl } from '@/utils/URLHelpers/getIdFromUrl';
import { getSearchWith } from '@/utils/URLHelpers';
import { toogleItemToCart } from '@/redux/slices';
import { useAppSelector } from '@/redux/hooks';
import { isItemExistInCart } from '@/utils/isItemExistInCart';
import { cartSelector } from '@/redux/selectors';

interface Props {
  character: CharacterData;
}

export const CharacterItem: FC<Props> = ({ character }) => {
  const { url, planet, name, hair_color: hair, eye_color: eye, birth_year: birthday } = character;
  const descriptions = { planet, hair, eye, birthday };
  const id = getIdFromUrl(url);
  const dispatch = useDispatch();
  const cart = useAppSelector(cartSelector, shallowEqual);

  const [searchParams] = useSearchParams();
  const path = `./?${getSearchWith(searchParams, { details: id })}`;

  return (
    <li className={s.item}>
      <article>
        <CustomLink path={path}>
          <div className={s.imgContainer}>
            <img
              className={s.img}
              src={`/People/${id}.jpg`}
              alt={name}
            />
          </div>
        </CustomLink>
        <div className={s.nameContainer}>
          <h2 className={s.itemName}>
            <CustomLink
              label={name}
              path={path}
            />
          </h2>

          <input
            data-testid="checkbox"
            className={s.checkbox}
            type="checkbox"
            onClick={(e) => e.stopPropagation()}
            onChange={() => dispatch(toogleItemToCart(character))}
            checked={!!isItemExistInCart(cart, character)}
          />
        </div>
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
