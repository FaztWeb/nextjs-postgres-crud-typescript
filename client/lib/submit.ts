import {
  concat,
  delay,
  exhaustMap,
  first,
  from,
  iif,
  last,
  map,
  mergeMap,
  Observable,
  of,
  pipe,
  race,
  shareReplay,
  tap,
} from 'rxjs';

interface Data {
  isFinish: boolean;
  response: Response;
}

export const submit = <T>(data: Observable<T>, path: string) =>
  pipe(
    tap(() => {
      // handle authentication
    }),
    mergeMap(() => {
      return data;
    }),
    first(),
    exhaustMap((payload) => {
      const data$ = from(
        fetch(path, {
          method: 'POST',
          body: payload,
        })
      ).pipe(
        delay(1000),
        map((response) => {
          return {
            response,
            isFinish: true,
          } as Data;
        }),
        shareReplay(1)
      );
      const showAfter$ = of(true).pipe(
        delay(500),
        map(() => ({
          isFinish: false,
        }))
      );
      const showFor$ = of(true).pipe(delay(1500));
      return race(data$, showAfter$).pipe(
        mergeMap((v) => {
          return iif(
            () => v.isFinish,
            data$,
            concat(showFor$, data$).pipe(last())
          ) as Observable<Data>;
        })
      );
    })
  );
