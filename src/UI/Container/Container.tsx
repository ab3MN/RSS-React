import { FC, ReactNode } from 'react';

import s from './Container.module.scss';

interface Props {
  title?: string;
  titlePB?: string;
  children: ReactNode;
}

export const Container: FC<Props> = ({ title, children, titlePB = '24px' }) => (
  <section>
    <div className={s.container}>
      {title && (
        <h2
          className={s.title}
          style={{ paddingBottom: titlePB }}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  </section>
);
