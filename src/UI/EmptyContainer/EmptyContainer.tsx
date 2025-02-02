import cn from 'classnames';
import { Component } from 'react';

import s from './EmptyContainer.module.scss';

interface Props {
  title: string;
  pathToImg: string;
  alt: string;
}

export class EmptyContainer extends Component<Props> {
  render() {
    const { title, pathToImg, alt } = this.props;

    return (
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
  }
}

export default EmptyContainer;
