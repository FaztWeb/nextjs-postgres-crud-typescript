import { useSession } from 'next-auth/react';
import { FC } from 'react';
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
  race,
  shareReplay,
  tap,
} from 'rxjs';
// import {
//   closePopup,
//   openModal,
//   openPopup,
// } from 'store/widgets/widgets-reducers';
import Button from '../../Button';
import type {
  FileUploadError,
  FileUploadSuccess,
} from 'pages/api/images/images';
import submit_images_styles from './submit-images.module.css';

interface Data {
  isFinish: boolean;
  response: Response;
}

export interface PopupBuilder {
  type: 'Error' | 'Success';
  payload: string | JSX.Element;
}

const SubmitImages: FC<{
  payload: string;
  data: Observable<unknown>;
  path: string;
}> = ({ payload, data, path }) => {
  // const { data: sessionData } = useSession();
  const clickEvent = () => {
    of(true)
      .pipe(
        tap(() => {
          // closePopup('success-popup');
        }),
        tap(() => {
          // if (!sessionData?.user) {
          //   openModal('authenticate-modal');
          //   s.unsubscribe();
          // }
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
        }),
        mergeMap(async (response) => {
          const success = (await response.response.json()) as
            | FileUploadError
            | FileUploadSuccess;

          // openPopup(
          //   'success-popup',
          //   success.ok
          //     ? {
          //         type: 'Success',
          //         payload: success.message,
          //       }
          //     : {
          //         type: 'Error',
          //         payload: success.error,
          //       }
          // );

          console.log(success.file);
          return success.file;
        }),
        delay(3000),
        tap(() => {
          // closePopup('success-popup');
        }),
        delay(1000)
        // tap((file) => {
        //   if (file)
        //     openPopup('success-popup', {
        //       type: 'Error',
        //       payload: (
        //         <div className={submit_images_styles.container}>
        //           Doriti sa schimbati numele fisierului
        //           <div className={submit_images_styles.button_container}>
        //             <button
        //               onClick={() => {
        //                 openModal('picture-change-name-modal', {
        //                   picture: file,
        //                 });
        //                 closePopup('success-popup');
        //               }}
        //             >
        //               DA
        //             </button>
        //             <button
        //               onClick={() => {
        //                 closePopup('success-popup');
        //               }}
        //             >
        //               NU
        //             </button>
        //           </div>
        //         </div>
        //       ),
        //     });
        // }
        // )
      )
      .subscribe();
  };
  return <Button payload={payload} onClick={clickEvent} />;
};

export default SubmitImages;
