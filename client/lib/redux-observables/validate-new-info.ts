import { Action } from '@reduxjs/toolkit';
import { ofType } from 'redux-observable';
import { iif, mergeMap, Observable, pipe, withLatestFrom } from 'rxjs';

interface UserProvidedInput {
  lastUpdatedInfo: string;
  currentUserInfo: string;
  type: string;
}

const sendNewInfo = (
  action$: Observable<UserProvidedInput>,
  state$: Observable<UserProvidedInput>
) =>
  action$.pipe(
    ofType('info/update'),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      iif(
        () => {},
        of({
          type: 'icon/stale',
        })
      )
    )
  );

export default sendNewInfo;
