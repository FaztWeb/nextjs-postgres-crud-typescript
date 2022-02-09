import navbar_style from './navbar.module.css';
import { HiMenu } from 'react-icons/hi';
import { useAppDispatch } from 'hooks/redux-hooks';
const Navbar = () => {
  const dispatch = useAppDispatch();
  const showSearch = () => {
    dispatch({
      type: 'searchbar/open',
    });
  };
  return (
    <div className={navbar_style.container} onClick={showSearch}>
      <div className={navbar_style.icon}>
        <HiMenu />
      </div>
    </div>
  );
};

export default Navbar;
