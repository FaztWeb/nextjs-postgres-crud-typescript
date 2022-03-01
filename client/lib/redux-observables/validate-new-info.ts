import { Action } from '@reduxjs/toolkit';
import { ofType, StateObservable } from 'redux-observable';
import {
  debounceTime,
  from,
  iif,
  mergeMap,
  Observable,
  of,
  tap,
  withLatestFrom,
} from 'rxjs';
import { update } from './info-slice';
import { RootState } from 'store/store';

const sendNewInfo = (
  action$: Observable<Action<string>>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    tap((e) => {
      console.log(e);
    }),
    ofType('change-info/processUserInput'),
    debounceTime(1000),
    withLatestFrom(state$),
    tap(([action, state]) => {
      console.log(action, state);
    }),
    mergeMap(([_, state]) =>
      iif(
        () => state.info.currentUserInfo === state.info.lastUpdatedInfo,
        of({ type: 'none/none' }),
        from(fetch(`/api/church-info/${state.info.churchName}`)).pipe(
          mergeMap(() =>
            from([update(state.info.currentUserInfo), { type: 'icon/success' }])
          )
        )
      )
    )
  );

export default sendNewInfo;
