import { Cart } from '@/types/Cart.types';

export const isItemExistInCart = <T extends { name: string }>(cart: Cart<T>, item: T) =>
  cart.items.find(({ name }) => name === item.name);
