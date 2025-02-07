import { FC } from 'react';

import { Pagination } from '../Pagination/Pagination';

import { CharacterList } from '@/UI/CharacterList/CharacterList';
import { CharacterData } from '@/types/Characker.type';
import { ResponseData } from '@/types/Response.type';

interface Props {
  data: ResponseData<CharacterData>;
}

export const Characters: FC<Props> = ({ data }) => {
  const { results: characters, count } = data;

  return (
    <div>
      <CharacterList characters={characters} />
      <Pagination totalPage={Math.round(count / 10)} />
    </div>
  );
};
