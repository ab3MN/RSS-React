import { lazy } from 'react';

export const Pages = {
  NotFoundPage: lazy(() => import('../pages/NotFoundPage/NotFoundPage')),
  CharacterPage: lazy(() => import('../pages/CharacterPage/CharacterPage')),
  CharactersPage: lazy(() => import('../pages/CharactersPage/CharactersPage')),
  CartPage: lazy(() => import('../pages/CartPage/CartPage')),
};
