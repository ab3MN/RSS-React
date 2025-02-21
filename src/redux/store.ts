import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartSlice from './slices/cart.slice';
import characterSlice from './slices/character.slice';

const persistedCartReducer = persistReducer({ key: 'cart', storage }, cartSlice);

export const store = configureStore({
  reducer: {
    cartReducer: persistedCartReducer,
    [characterSlice.reducerPath]: characterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(characterSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export const persistor = persistStore(store);
