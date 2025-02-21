import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import s from './Download.module.scss';

import { Cart } from '@/types/Cart.types';
import { CharacterData } from '@/types/Characker.type';
import { getCharactersFileData } from '@/utils';
import { clearCart } from '@/redux/slices';
import { Button } from '@/UI/Button/Button';
import { DownLoadLink } from '@/UI/Button/DownLoadLink';

interface Props {
  cart: Cart<CharacterData>;
}

export const Download: FC<Props> = ({ cart }) => {
  const [href, setHref] = useState('');
  const dispatch = useDispatch();

  const handleDonwload = (): void => {
    const fileData = getCharactersFileData(cart.items);
    const blob = new Blob([fileData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    setHref(url);
  };

  return (
    <div className={cn(s.container, { [s.visible]: !!cart.items.length })}>
      <DownLoadLink
        download={`${cart.items.length}_StarWars_Characters.csv`}
        onClick={handleDonwload}
        href={href}
        label="Download"
      />

      <p>Selected: {cart.quantity} items</p>
      <Button
        label="Unselect all"
        type="button"
        onClick={() => {
          dispatch(clearCart());
        }}
      />
    </div>
  );
};
