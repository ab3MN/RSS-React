import { FC } from 'react';

import { CartItem } from '../CartItem/CartItem';

import s from './CartList.module.scss';

import { CharacterData } from '@/types/Characker.type';

interface Props {
  items: CharacterData[];
}

export const CartList: FC<Props> = ({ items }) => (
  <ul className={s.list}>
    {items.map((item) => (
      <li
        className={s.listItem}
        key={item.name}
      >
        <CartItem item={item} />
      </li>
    ))}
  </ul>
);
