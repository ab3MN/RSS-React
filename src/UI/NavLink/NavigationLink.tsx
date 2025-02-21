import { NavLink } from 'react-router-dom';

import s from './NavigationLink.module.scss';

type Props = {
  to: string;
  label: string | React.ReactNode;
  handleClick?: () => void;
};

const NavigationLink: React.FC<Props> = ({ to, label, handleClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (isActive ? `${s.link} ${s.active}` : s.link)}
    onClick={handleClick}
  >
    {label}
  </NavLink>
);

export default NavigationLink;
