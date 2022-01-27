import { forwardRef } from 'react';

import searchboxStyle from './searchbox.module.css';
import Searchbar from './Searchbar/Searchbar';
import SearchResults from './SearchResults/SearchResults';

const Searchbox = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className={searchboxStyle.container}>
      <Searchbar></Searchbar>
      <SearchResults></SearchResults>
    </div>
  );
});

Searchbox.displayName = 'Searchbar';
export default Searchbox;
