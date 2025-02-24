import { FC, ReactNode } from 'react';

import s from './NavigationLink.module.scss';

type Props = {
  href: string;
  label: string | ReactNode;
  handleClick?: () => void;
};

const BlankLink: FC<Props> = ({ href, label, handleClick }) => (
  <a
    href={href}
    target="_blank"
    className={s.link}
    onClick={handleClick}
    rel="noreferrer"
  >
    {label}
  </a>
);

export default BlankLink;
