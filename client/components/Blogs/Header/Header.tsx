import { FC } from 'react';
import header__styles from './header.module.css';
const Header: FC<{ name: string }> = ({ name }) => {
  return <div className={header__styles.container}>{name}</div>;
};

export default Header;
