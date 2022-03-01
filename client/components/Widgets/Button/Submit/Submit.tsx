import { useSession } from 'next-auth/react';
import { FC } from 'react';
import { delay, mergeMap, Observable, of, tap } from 'rxjs';
import {
  closePopup,
  openModal,
  openPopup,
} from 'store/widgets/widgets-reducers';
import Button from '../Button';
import type {
  FileUploadError,
  FileUploadSuccess,
} from '../../../../pages/api/images/images';
import { submit } from 'lib/submit';

interface Data {
  isFinish: boolean;
  response: Response;
}

export interface PopupBuilder {
  type: 'Error' | 'Success';
  payload: string | JSX.Element;
}

const Dispatch: FC<{
  payload: string;
  data: Observable<unknown>;
  path: string;
}> = ({ payload, data, path }) => {
  // const { data: sessionData } = useSession();
  const sendPictures = submit(data, path);
  const clickEvent = () => {
    of(true)
      .pipe(
        tap(() => {
          closePopup('success-popup');
        }),
        sendPictures,
        mergeMap(async (response) => {
          const success = (await response.response.json()) as
            | FileUploadError
            | FileUploadSuccess;

          openPopup(
            'success-popup',
            success.ok
              ? {
                  type: 'Success',
                  payload: success.message,
                }
              : {
                  type: 'Error',
                  payload: success.error,
                }
          );
          return success?.file || undefined;
        }),
        delay(10000),
        tap((file) => {
          closePopup('success-popup');
          if (file)
            openPopup('success-popup', {
              type: 'Error',
              payload: (
                <div>
                  Doriti sa schimbati numele fisierului
                  <button
                    onClick={() => {
                      openModal('picture-change-name-modal', {
                        picture: file,
                      });
                    }}
                  >
                    DA
                  </button>
                  <button> NU </button>
                </div>
              ),
            });
        })
      )
      .subscribe();
  };
  return <Button payload={payload} onClick={clickEvent} />;
};

export default Dispatch;
