import { FC } from 'react';

import s from './Cart.module.scss';
import { CartList } from './CartList/CartList';

import { Cart } from '@/types/Cart.types';
import { CharacterData } from '@/types/Characker.type';

interface Props {
  cart: Cart<CharacterData>;
}

export const CartComponent: FC<Props> = ({ cart }) => {
  const { items, quantity } = cart;

  return (
    <>
      <CartList items={items} />
      <p className={s.quantity}>
        Total Quantity: <span>{quantity}</span>{' '}
      </p>
    </>
  );
};
