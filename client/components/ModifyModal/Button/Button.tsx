import { useEffect, useRef, useState } from 'react';
import buttonStyle from './button.module.css';
import Tooltip from 'rc-tooltip';
import ActionPopup from 'components/ActionPopup/ActionPopup';
import triggers from 'lib/trigger';
import {
  exhaustMap,
  of,
  fromEvent,
  Subscription,
  catchError,
  shareReplay,
  delay,
  concat,
  race,
  tap,
  from,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

const ids = ['info', 'name', 'descriptions'];
const data = ids.reduce<Record<string, string>>((obj, field) => {
  return { ...obj, [field]: '' };
}, {} as Record<string, string>);

const except = (v: unknown) => {
  throw v;
};

const Button = () => {
  const [visible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let click$: Subscription;
    if (buttonRef.current)
      click$ = fromEvent(buttonRef.current, 'click')
        .pipe(
          exhaustMap(() => {
            /**
             * **data$** will contain the staus of the POST request.
             *
             * In addition it will also unmount the Loding component on completion.
             *
             * It also gives multiple subscribers the same payload via shareReplay (e.g. we are going to
             * set a subscription in *_race_* to see if it's worth displaying a loading component while fetching, or
             * if fetch is fast enough to POST (if the fetch is fast enough the subscription will emmit the payload).
             * But if it isn't we want to set a subscription in *_concat_* to ensure that no
             * flashes of UI occur (this is the second possible subscriber to **data$** which **SHOULD NOT** recieve
             * a different payload when subscribing).
             */
            const data$ = from(
              fetch('/api', {
                body: JSON.stringify(data),
                method: 'POST',
              }).then((res) => {
                return res;
              })
            ).pipe(
              tap(() => {
                setLoading(false);
              })
            );

            /**
             * **showAfter$** is used to prevent the Loading component from showing when requests
             * last under 500ms.
             *
             * To achieve this we will start a timer and play two scenarios:
             * 1. If the observer isn't canceled by the completion of the fetch request, then we want to
             * set the loading state to true.
             * 2. If the fetch was completed before the timer,
             * the _race_ condition will make sure to unsubscribe from the showAfter$ observer, thus never
             * setting the loading state to true.
             */
            const showAfter$ = of(1).pipe(
              delay(500),
              tap(() => setLoading(true))
            );

            /**
             * **showFor$** will make sure the Loading component doesn't flash before the user,
             * guaranteeing a consistent UI.
             *
             * If **showFor** has been triggered, fetch takes longer to complete the request.
             * In this case, we want to show the user that their action is beeing proccesed by using a
             * Loading component which will appear on screen. When the request has been setteled,
             * the Loading component must be unmounted from the DOM. We want to prevent inconsistencies
             * in showing the Loading component (such as flashes of UI) by forcing it to stay a bare minimum
             * on the screen. Thus the **showFor$** will keep the loaing state to true for as much as the
             * timer indicates. In the **_concat_** context, it will block the removal of the
             * Loading for that much time, by not subscribing to another observer until the delay completes.
             */
            const showFor$ = of(1).pipe(
              delay(1500),
              tap(() => setLoading(false))
            );

            /**
             * **loading$** chains the observers to prevent UI inconsistencies.
             *
             *  As the specs define the behavior of **_concat_**, **loading$** will start emmiting only
             *  when the first observer there completes and (if not unsubscribed) will sequentially subscribe to the other observables,
             *  in the order they were defined (and after they complete).
             *
             * For the *race* condition this opens two scenarios:
             *  1. If **data$** emmits faster, *race* will pick it and unsubscribe from **loading$**, thus,
             *  never really reading into any other observables chained in **concat**.
             * 2. If the first observable (i.e **showAfter$**) emmits first, *race* will pick **loading$** and unsubscribe to **data$** thus following the pattern described in **showFor$**
             */
            const loading$ = concat(showAfter$, showFor$, data$);

            /**
             * as the specs provide race will subscribe to both observables, consecutively unsubscribing to the one emmiting slower.
             * Looking into the behaviour of **loading$**, what **race** really does is seeing if it's worth displaying the Loaing component
             * as it actually races **showAfter$** and **data$** and following of the two scenarios mentioned above.
             */
            return race(loading$, data$);
          }),

          catchError((err) =>
            of({ error: true, message: err.toString() } as const)
          )
        )
        .subscribe(console.log);
    const value$ = ids.map((id) =>
      triggers[id].subscribe((event) => {
        data[id] = event.payload;
        console.log(data);
      })
    );
    () => {
      click$.unsubscribe();
      value$.forEach((value) => value.unsubscribe());
    };
  }, []);
  return (
    <Tooltip visible={visible} overlay={<ActionPopup />} placement="bottom">
      <button className={buttonStyle.button} ref={buttonRef}>
        Salvati Modificarile
      </button>
    </Tooltip>
  );
};

export default Button;
