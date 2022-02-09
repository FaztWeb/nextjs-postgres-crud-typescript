import { input$ } from 'lib/modal';
import { ChangeEvent } from 'react';
import searchbarStyle from './searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useAppDispatch } from 'hooks/redux-hooks';

const Searchbar = () => {
  const handler = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    input$.next(query);
  };
  const dispatch = useAppDispatch();
  const closeSearch = () => {
    dispatch({
      type: 'searchbar/close',
    });
  };

  return (
    <div className={searchbarStyle.container}>
      <div className={searchbarStyle.close}>
        <IoMdClose
          onClick={closeSearch}
          className={searchbarStyle.close_icon}
        />
      </div>
      <div className={searchbarStyle.search__container}>
        <div className={searchbarStyle.search}>
          <FaSearch className={searchbarStyle.search__icon} />
        </div>
        <input
          type="text"
          className={searchbarStyle.search__bar}
          onChange={handler}
        />
      </div>
    </div>
  );
};

export default Searchbar;
