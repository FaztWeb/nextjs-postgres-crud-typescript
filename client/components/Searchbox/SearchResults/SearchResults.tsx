import { input$ } from 'lib/modal';
import { useEffect, useState } from 'react';
import { debounceTime, from, mergeMap, tap, map } from 'rxjs';
import searchResults from './searchResults.module.css';
import { chruches } from 'components/Map/featureLayer';
import Card from './Card/Card';

export interface Church {
  name: string;
  lat: number;
  long: number;
}
const Searchbar = () => {
  const [inputValue, setInputValue] = useState<Church[]>([]);
  useEffect(() => {
    const data$ = from(chruches);
    chruches.then((allChurches) => setInputValue(allChurches));
    const obs = input$
      .pipe(
        mergeMap((inputedValue: string) => {
          return data$.pipe(
            map((data) =>
              data.filter((data) => data.name.includes(inputedValue))
            )
          );
        }),
        debounceTime(500),
        tap((church) => (church ? setInputValue(church) : 0))
      )
      .subscribe();

    () => obs.unsubscribe();
  }, []);
  return (
    <div className={searchResults.panel}>
      <div className={searchResults.cards__container}>
        {inputValue?.map((value) => {
          const { lat, long } = value;
          value.lat = Number(lat.toFixed(4));
          value.long = Number(long.toFixed(4));
          return <Card key={value.name} church={value}></Card>;
        })}
      </div>
    </div>
  );
};

export default Searchbar;
