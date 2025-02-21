import { FC } from 'react';

import s from './CartItem.module.scss';

// import { IconButton } from '@/UI/IconButton/IconButton';
import Close from '@/assets/Close.svg?react';
import { CustomLink } from '@/UI/Link/Link';
import { CharacterData } from '@/types/Characker.type';
import { PATH } from '@/constants/path';
import { getIdFromUrl } from '@/utils/URLHelpers';

interface Props {
  item: CharacterData;
}

export const CartItem: FC<Props> = ({ item }) => {
  const { name, url } = item;

  const id = getIdFromUrl(url);

  return (
    <article className={s.cartItem}>
      <div className={s.description}>
        <button className={s.close}>
          <Close />
        </button>
        <div className={s.imgContainer}>
          <img
            className={s.img}
            src={`/People/${id}.jpg`}
            alt={name}
          />
        </div>

        <CustomLink
          label={name}
          path={`/${PATH.CHARACTERS}/?details=${id}`}
        />
      </div>
      {/* <div className={s.controls}>
        <div className={s.controlsContainer}>
          <IconButton
            onClick={handleDecrease(id)}
            hasBorder
            width="32px"
            height="32px"
          >
            <Minus />
          </IconButton>

          <div className={s.quantity}>{quantity}</div>

          <IconButton
            onClick={handleIncrease(id)}
            hasBorder
            width="32px"
            height="32px"
          >
            <Plus />
          </IconButton>
        </div>
      </div> */}
    </article>
  );
};
