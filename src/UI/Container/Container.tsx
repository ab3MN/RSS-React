import { PureComponent, ReactNode } from 'react';

import s from './Container.module.scss';

interface Props {
  title?: string;
  titlePB?: string;
  children: ReactNode;
}

export class Container extends PureComponent<Props> {
  render() {
    const { title, titlePB = '24px', children } = this.props;

    return (
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
  }
}

export default Container;
