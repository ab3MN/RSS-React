import { Component } from 'react';

import { SkeletoneItem } from '../SkeletoneItem/SkeletoneItem';

import s from './SkeletoneList.module.scss';

import Container from '@/UI/Container/Container';

interface Props {
  length: number;
}

export class SkeletoneList extends Component<Props> {
  render() {
    const { length } = this.props;

    return (
      <Container>
        <div className={s.container}>
          {Array.from({ length }, () => (
            <SkeletoneItem key={self.crypto.randomUUID()} />
          ))}
        </div>
      </Container>
    );
  }
}
