import { FC } from 'react';

import s from './Chracter.module.scss';

import { CharacterData } from '@/types/Characker.type';
import Close from '@/assets/Close.svg?react';
import { IconButton } from '@/UI/IconButton/IconButton';
import { useDetailsHandler } from '@/hooks/useDetailsHandler';

interface Props {
  character: CharacterData;
  id: number;
}

export const Character: FC<Props> = ({ character, id }) => {
  const { planet, name, hair_color: hair, eye_color: eye, birth_year: birthday } = character;
  const descriptions = { planet, hair, eye, birthday };

  const { closeDetails } = useDetailsHandler();

  return (
    <article>
      <IconButton
        onClick={closeDetails}
        style={{ display: 'flex', justifyContent: 'end' }}
      >
        <Close />
      </IconButton>

      <div className={s.imgContainer}>
        <img
          className={s.img}
          src={`../src/assets/People/${id}.jpg`}
          alt={name}
        />
      </div>
      <h4 className={s.name}>{name}</h4>
      {Object.entries(descriptions).map(([key, value]) => (
        <p
          className={s.description}
          key={key}
        >
          <span>{key}</span> {value}
        </p>
      ))}
    </article>
  );
};
