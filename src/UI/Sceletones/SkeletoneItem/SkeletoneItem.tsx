import { PureComponent } from 'react';

import s from './SkeletoneItem.module.scss';

import SceletonLight from '@/assets/SceletonLight.svg?react';

export class SkeletoneItem extends PureComponent {
  render() {
    return (
      <div className={s.container}>
        <SceletonLight />
      </div>
    );
  }
}
