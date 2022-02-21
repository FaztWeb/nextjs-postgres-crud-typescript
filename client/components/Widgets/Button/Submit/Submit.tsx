import { useAppDispatch } from 'hooks/redux-hooks';
import { useSession } from 'next-auth/react';
import { FC } from 'react';
import {
  concat,
  delay,
  exhaustMap,
  first,
  from,
  iif,
  map,
  mergeMap,
  Observable,
  of,
  race,
  shareReplay,
  tap,
} from 'rxjs';
import { action } from 'store';
import Button from '../Button';

interface Data {
  isFinish: boolean;
  response: Response;
}

interface ResponsePayload {
  ok: boolean;
  error?: string;
}

const Dispatch: FC<{
  payload: string;
  data: Observable<unknown>;
  path: string;
}> = ({ payload, data, path }) => {
  const { data: sessionData } = useSession();
  const dispatch = useAppDispatch();
  const clickEvent = () => {
    const s = of(true)
      .pipe(
        tap(() => {
          if (!sessionData?.user) {
            dispatch(
              action('authenticate-modal/open', {
                zIndex: 9999,
              })
            );
            s.unsubscribe();
          }
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
                concat(showFor$, data$)
              ) as Observable<Data>;
            })
          );
        }),
        tap(async (v) => {
          dispatch();
        })
      )
      .subscribe();
  };
  return <Button payload={payload} onClick={clickEvent} />;
};

export default Dispatch;
