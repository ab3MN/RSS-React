import s from './SkeletoneItem.module.scss';

import SceletonLight from '@/assets/SceletonLight.svg?react';

export const SkeletoneItem = () => (
  <div className={s.container}>
    <SceletonLight />
  </div>
);
