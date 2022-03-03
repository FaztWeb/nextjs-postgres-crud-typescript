import { Action } from '@reduxjs/toolkit';
import { ofType, StateObservable } from 'redux-observable';
import {
  debounceTime,
  from,
  iif,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { update } from '../../components/Widgets/Modals/Modify/Field/info-slice';
import { RootState } from 'store/store';
import { churchInfoApi } from 'lib/church-info-fetcher';
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
    switchMap(([_, state]) =>
      iif(
        () => state.info.currentUserInfo === state.info.lastUpdatedInfo,
        of({ type: 'none/none' }),
        from(
          fetch(`/api/church-info/${state.info.churchName}`, {
            body: JSON.stringify({
              churchDescription: state.info.currentUserInfo,
              churchName: state.info.churchName,
              editedBy: 'ANONIM',
            }),
            method: 'POST',
          })
        ).pipe(
          mergeMap(() =>
            from([
              update(state.info.currentUserInfo),
              { type: 'icon/success' },
              churchInfoApi.util.updateQueryData(
                'getChurchInfo',
                `${state.info.churchName}`,
                (draft) => {
                  draft.churchInfo = {
                    churchDescription: state.info.currentUserInfo,
                    churchName: state.info.churchName,
                    editedBy: 'ANONIM',
                  };
                }
              ),
            ])
          )
        )
      )
    )
  );

export default sendNewInfo;
