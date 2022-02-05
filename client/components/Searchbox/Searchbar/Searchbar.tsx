import { input$ } from 'lib/modal';
import { ChangeEvent } from 'react';
import searchbarStyle from './searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const Searchbar = () => {
  const handler = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    input$.next(query);
  };
  return (
    <div className={searchbarStyle.container}>
      <div className={searchbarStyle.close}>
        <IoMdClose className={searchbarStyle.close_icon} />
      </div>
      <div className={searchbarStyle.search__container}>
        <div className={searchbarStyle.icon}>
          <FaSearch />
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
