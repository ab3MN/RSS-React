import { FC } from 'react';

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
      <p>Total Quantity {quantity}</p>
    </>
  );
};
