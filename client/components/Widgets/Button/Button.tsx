import { FC, useEffect, useRef } from 'react';
import { imagesFrom } from 'lib/modal';
import {
  mergeMap,
  exhaustMap,
  of,
  Subscription,
  catchError,
  shareReplay,
  delay,
  concat,
  race,
  tap,
  from,
  fromEvent,
  map,
  iif,
} from 'rxjs';
import { useSession, signIn } from 'next-auth/react';

import Tooltip from 'rc-tooltip';
// import ActionPopup from '../ActionPopup/ActionPopup';

import buttonStyle from './button.module.css';
// const form = new FormData();

const Button: FC<{ payload: string; action: () => void }> = ({
  payload,
  action,
}) => {
  // const [visible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  useEffect(() => {
    let clickSub: Subscription;
    if (tooltipRef.current && buttonRef.current)
      clickSub = fromEvent(buttonRef.current, 'click')
        .pipe(
          // tap(() => {
          //   console.log(session?.user);
          //   if (!session?.user) {
          //     signIn();
          //     clickSub.unsubscribe();
          //   }
          // }),
          mergeMap(() => {
            /**
             * We process the images from the user (only when submitting).
             */
            return imagesFrom.pipe(tap(console.log));
          }),
          exhaustMap((form) => {
            console.log('FORM');
            /**
             * **data$** will control the loading state based on request made.
             * It will mount the loading component when data processing and posting starts, and
             * unmount it on completion.
             *
             * It also gives multiple subscribers the same payload via shareReplay. It becomes useful when we consider the following scenario:
             *
             * 1.We are going to subscribe to **data$** in *_race_* to see if it's worth displaying a loading component while "fetching".
             *
             * 2.If the fetching isn't fast enough we want to subscribe to the **data$** again in *_concat_* (ensuring that no flashes of UI occur).
             *
             * Depending on the response time of the server, one of these scenarios will play out. Either way, we must ensure both instances will
             * receive and pass down the same response.
             */
            const data$ = from(
              fetch('/api/images/images', {
                method: 'POST',
                body: form,
              })
            ).pipe(
              map((r) => ({
                payload: r,
              })),
              shareReplay(1)
            );
            const showAfter$ = of(true).pipe(
              delay(500),
              map(() => ({
                payload: undefined,
              }))
            );

            const showFor$ = of(true).pipe(delay(1500));

            return race(showAfter$, data$).pipe(
              mergeMap(({ payload }) => {
                return iif(
                  () => !!payload,
                  of({ payload }),
                  concat(showFor$, data$)
                );
              })
            );
          }),

          tap(() => {
            console.log('COMPLETED FETCH');
          }),
          catchError((err) =>
            of({ error: true, message: err.toString() } as const)
          )
        )
        .subscribe(console.log);
    return () => {
      clickSub?.unsubscribe();
    };
  }, []);

  return (
    <Tooltip
      visible={true}
      ref={tooltipRef}
      placement="bottom"
      overlay={<div />}
    >
      <button className={buttonStyle.button} ref={buttonRef} onClick={action}>
        {payload}
      </button>
    </Tooltip>
  );
};

export default Button;
