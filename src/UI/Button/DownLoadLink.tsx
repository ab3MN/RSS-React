import { FC } from 'react';
import cn from 'classnames';

import s from './Button.module.scss';

interface Props {
  label: string;
  download: string;
  onClick?: () => void;
  href: string;
}
export const DownLoadLink: FC<Props> = ({ label, onClick, download, href }) => (
  <a
    className={cn(s.button, 'primary-text')}
    download={download}
    onClick={onClick}
    href={href}
  >
    {label}
  </a>
);
