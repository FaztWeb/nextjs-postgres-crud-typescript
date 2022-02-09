import navbar_style from './navbar.module.css';
import { HiMenu } from 'react-icons/hi';
import { useAppDispatch } from 'hooks/redux-hooks';
const Navbar = () => {
  const dispatch = useAppDispatch();
  const showSearch = () => {
    dispatch({
      type: 'searchbar/toggle',
    });
  };
  return (
    <div className={navbar_style.container}>
      <div className={navbar_style.icon}>
        <HiMenu onClick={showSearch} />
      </div>
    </div>
  );
};

export default Navbar;
