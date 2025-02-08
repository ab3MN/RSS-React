import { FC } from 'react';

import { SkeletoneItem } from '../SkeletoneItem/SkeletoneItem';

import s from './SkeletoneList.module.scss';

import { Container } from '@/UI/Container/Container';

interface Props {
  length: number;
}

export const SkeletoneList: FC<Props> = ({ length }) => (
  <Container>
    <div
      className={s.container}
      data-testid="skeletone-list-container"
    >
      {Array.from({ length }, () => (
        <SkeletoneItem
          key={self.crypto.randomUUID()}
          data-testid="sceleton-item"
        />
      ))}
    </div>
  </Container>
);
