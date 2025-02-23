import { FC } from 'react';
import { useDispatch } from 'react-redux';

import s from './CartItem.module.scss';

import { CustomLink } from '@/UI/Link/Link';
import { CharacterData } from '@/types/Characker.type';
import { PATH } from '@/constants/path';
import { getIdFromUrl } from '@/utils/URLHelpers';
import { toogleItemToCart } from '@/redux/slices';
import { Button } from '@/UI/Button/Button';

interface Props {
  item: CharacterData;
}

export const CartItem: FC<Props> = ({ item }) => {
  const { name, url } = item;
  const dispatch = useDispatch();

  const id = getIdFromUrl(url);

  return (
    <article className={s.cartItem}>
      <div className={s.description}>
        <div className={s.imgContainer}>
          <img
            className={s.img}
            src={`/People/${id}.jpg`}
            alt={name}
          />
        </div>

        <CustomLink
          label={name}
          style={{ paddingBlock: '20px' }}
          path={`../${PATH.CHARACTERS}/?details=${id}`}
        />

        <Button
          type="button"
          onClick={() => dispatch(toogleItemToCart(item))}
          label="Remove Item"
        />
      </div>
    </article>
  );
};
