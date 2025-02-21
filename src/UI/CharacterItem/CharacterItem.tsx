import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { CustomLink } from '../Link/Link';
import { Button } from '../Button/Button';

import s from './CharacterItem.module.scss';

import { CharacterData } from '@/types/Characker.type';
import { getIdFromUrl } from '@/utils/URLHelpers/getIdFromUrl';
import { getSearchWith } from '@/utils/URLHelpers';
import { toogleItemToCart } from '@/redux/slices';
import { useAppSelector } from '@/redux/hooks';
import { isItemExistInCart } from '@/utils/isItemExistInCart';

interface Props {
  character: CharacterData;
}

export const CharacterItem: FC<Props> = ({ character }) => {
  const { url, planet, name, hair_color: hair, eye_color: eye, birth_year: birthday } = character;
  const descriptions = { planet, hair, eye, birthday };
  const id = getIdFromUrl(url);
  const dispatch = useDispatch();
  const { cart } = useAppSelector((state) => state.cartReducer);

  const [searchParams] = useSearchParams();
  const path = `./?${getSearchWith(searchParams, { details: id })}`;

  return (
    <li className={s.item}>
      <article>
        <div className={s.imgContainer}>
          <CustomLink path={path}>
            <img
              className={s.img}
              src={`/People/${id}.jpg`}
              alt={name}
            />
          </CustomLink>
        </div>

        <h2 className={s.itemName}>
          <CustomLink
            label={name}
            path={path}
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

        <Button
          label="Add to Cart"
          onClick={() => dispatch(toogleItemToCart(character))}
          isSelected={!!isItemExistInCart(cart, character)}
          secondaryLabel="Added to Cart"
        />
      </article>
    </li>
  );
};
