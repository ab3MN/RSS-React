import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CharacterData } from '@/types/Characker.type';
import { Cart } from '@/types/Cart.types';

export interface CartState<> {
  cart: Cart<CharacterData>;
}

const initialState: CartState = {
  cart: {
    items: [],
    quantity: 0,
  },
};

const createCartSlice = () =>
  createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
      toogleItemToCart: (state, { payload }: PayloadAction<CharacterData>) => {
        const isItemExistInCart = state.cart.items.find(({ name }) => name === payload.name);

        if (isItemExistInCart) {
          state.cart.items = state.cart.items.filter(({ name }) => name !== payload.name);
          state.cart.quantity -= 1;
        } else {
          state.cart.items.push(payload);
          state.cart.quantity += 1;
        }
      },

      clearCart: (state) => {
        state.cart.items = [];
        state.cart.quantity = 0;
      },
    },
  });

export const cartSlice = createCartSlice();

export const { toogleItemToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
