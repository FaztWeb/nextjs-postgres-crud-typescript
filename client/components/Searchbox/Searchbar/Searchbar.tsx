import { input$ } from 'lib/modal';
import { ChangeEvent } from 'react';

import searchbarStyle from './searchbar.module.css';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
  const handler = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    input$.next(query);
  };
  return (
    <div className={searchbarStyle.container}>
      <input
        type="text"
        className={searchbarStyle.searchBar}
        onChange={handler}
      />
      <div className={searchbarStyle.icon}>
        <FaSearch />
      </div>
    </div>
  );
};

export default Searchbar;
