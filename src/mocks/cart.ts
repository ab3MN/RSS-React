import { charaktersData } from './CharackersData';

import { Cart } from '@/types/Cart.types';
import { CharacterData } from '@/types/Characker.type';

export const mockCart: Cart<CharacterData> = {
  items: charaktersData,
  quantity: 2,
};
