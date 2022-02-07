import { useEffect, useRef, useState } from 'react';
import { trigger$, showLoading$, ids, imageSupplier$ } from 'lib/modal';
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
} from 'rxjs';
import { useSession, signIn } from 'next-auth/react';

import Tooltip from 'rc-tooltip';
import buttonStyle from './button.module.css';
import ActionPopup from '../ActionPopup/ActionPopup';

const data = ids.reduce<Record<string, string>>((obj, field) => {
  return { ...obj, [field]: '' };
}, {} as Record<string, string>);

const form = new FormData();

const Button = () => {
  const [visible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  useEffect(() => {
    let clickSub: Subscription;
    if (tooltipRef.current && buttonRef.current)
      clickSub = fromEvent(buttonRef.current, 'click')
        .pipe(
          tap(() => {
            console.log(session?.user);
            if (!session?.user) {
              signIn();
              clickSub.unsubscribe();
            }
          }),
          mergeMap(() => {
            /**
             * We process the images from the user (only when submitting).
             */
            return imageSupplier$.pipe(
              map(({ church, files }) => {
                /**
                 * Before processing the current set of images we want to  remove all previous files
                 */
                form.delete(church);

                files.forEach((file) =>
                  /**
                   * Since the backend expects a form like structure, we append the images to
                   * the form object. For each file we also want to specify a name, that will mimic
                   * a real input form's unique id. This will help us sorting and saving images in the filesystem
                   */
                  form.append(church, file)
                );

                return { form, church };
              })
            );
          }),
          exhaustMap(({ form }) => {
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
              shareReplay(1),
              tap(() => {
                showLoading$.next(false);
              }),
              tap(() => {
                setIsVisible(true);
              }),
              delay(2000),
              tap(() => {
                setIsVisible(false);
              })
            );

            /**
             * **showAfter$** is used to prevent the Loading component from showing if the response time of the server
             * is under 500ms.
             *
             * To achieve this we will start a timer and play two scenarios:
             * 1. If the fetch was completed before the timer,
             * the _race_ condition will make sure to unsubscribe from the showAfter$ observer, thus never
             * setting the loading state to true.
             *
             * 2. If the observer isn't canceled by the completion of the fetch request, then we want to
             * set the loading state to true.
             */
            const showAfter$ = of(1).pipe(
              delay(500),
              tap(() => showLoading$.next(true))
            );

            /**
             * **showFor$** will make sure the Loading component doesn't flash before the user,
             * guaranteeing a consistent UI.
             *
             * If **showFor** has been triggered, fetch takes longer to complete the request.
             * In this case, we want to show the user that their action is being processed. When the request has been settled,
             * the Loading component must be unmounted from the DOM. We want to prevent inconsistencies
             * in showing the Loading component (such as flashes of UI) by forcing it to stay a bare minimum
             * on the screen. Using **_concat_**, it won't subscribe to **data$** -and possibly unmount loading- until the timer completes.
             * Thus **showFor$** will keep the loading state to true for as much as the timer indicates.
             */
            const showFor$ = of(1).pipe(delay(1500));

            /**
             * **loading$** chains the observers to prevent UI inconsistencies.
             *
             *  As the specs define the behavior of **_concat_**, **loading$** will start to emit only
             *  when the first observer there completes and (if not unsubscribed) will sequentially subscribe to the other observables,
             *  in the order they were defined (and after they complete).
             *
             * For the *race* condition this opens two scenarios:
             *  1. If **data$** emits faster, *race* will pick it and unsubscribe from **loading$**, thus,
             *  never really reading into any other observables chained in **concat**.
             * 2. If the first observable (i.e **showAfter$**) emits first, *race* will pick **loading$** and unsubscribe to **data$** thus following the pattern described in **showFor$**
             */
            const loading$ = concat(showAfter$, showFor$, data$);

            /**
             * as the specs provide race will subscribe to both observables, consecutively unsubscribing to the one emitting slower.
             * Looking into the behavior of **loading$**, what **race** really does is seeing if it's worth displaying the Loading component,
             * as it only races **showAfter$** and **data$** and following one of the two scenarios mentioned above.
             */
            return race(loading$, data$);
          }),

          catchError((err) =>
            of({ error: true, message: err.toString() } as const)
          )
        )
        .subscribe(console.log);

    const value$ = ids.map((id) =>
      trigger$[id].subscribe((event) => {
        data[id] = event.payload;
        console.log(data);
      })
    );
    () => {
      clickSub.unsubscribe();
      value$.forEach((value) => value.unsubscribe());
    };
  }, []);

  return (
    <Tooltip
      visible={true}
      ref={tooltipRef}
      overlay={<ActionPopup visible={visible} />}
      placement="bottom"
    >
      <button className={buttonStyle.button} ref={buttonRef}>
        Salvati Modificarile
      </button>
    </Tooltip>
  );
};

export default Button;
