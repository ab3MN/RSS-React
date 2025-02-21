import { FC } from 'react';

import { CartItem } from '../CartItem/CartItem';

import s from './CartList.module.scss';

import { CharacterData } from '@/types/Characker.type';

interface Props {
  items: CharacterData[];
}

export const CartList: FC<Props> = ({ items }) => (
  <ul
    className={s.list}
    data-aos="fade-right"
    data-aos-duration="1500"
  >
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
