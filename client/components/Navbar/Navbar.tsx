import navbar_style from './navbar.module.css';
import { HiMenu } from 'react-icons/hi';
import { useAppDispatch } from 'hooks/redux-hooks';
import { open } from 'components/Searchbox/search-slice';
const Navbar = () => {
  const dispatch = useAppDispatch();
  const showSearch = () => {
    dispatch(open());
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
