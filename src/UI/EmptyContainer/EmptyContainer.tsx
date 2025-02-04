import cn from 'classnames';
import { FC } from 'react';

import s from './EmptyContainer.module.scss';

interface Props {
  title: string;
  pathToImg: string;
  alt: string;
}

export const EmptyContainer: FC<Props> = ({ title, pathToImg, alt }) => (
  <article className={s.container}>
    <h2 className={cn(s.title)}>{title}</h2>
    <div className={s.imgContainer}>
      <img
        src={pathToImg}
        alt={alt}
      />
    </div>
  </article>
);
