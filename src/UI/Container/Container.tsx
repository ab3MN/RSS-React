import { FC, ReactNode } from 'react';

import s from './Container.module.scss';

interface Props {
  title?: string;
  titlePB?: string;
  children: ReactNode;
  style?: {
    [key: string]: string | number;
  };
}

export const Container: FC<Props> = ({ title, children, titlePB = '24px', style = {} }) => (
  <section style={style}>
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
