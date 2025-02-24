import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CharacterData } from '@/types/Characker.type';

export interface Cart {
  items: CharacterData[];
  quantity: number;
}

export interface CartState {
  cart: Cart;
}

const createInitialState = (): CartState => ({
  cart: {
    items: [],
    quantity: 0,
  },
});

const createCartSlice = () =>
  createSlice({
    name: 'cart',
    initialState: createInitialState(),
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
