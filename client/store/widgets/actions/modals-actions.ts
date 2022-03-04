import type { supportedModals } from '../widgets-available';
import type { supportedActions } from '../widgets-actions';
import { store } from 'store/store';
import { addWidget, removeWidget } from 'components/Widgets/stack-slice';
import { useAppSelector } from 'hooks/redux-hooks';

export const openModal = (
  modal: supportedModals,
  payload: supportedActions
) => {
  console.log(store.dispatch(addWidget(modal)));
  store.dispatch({
    type: `${modal}/open` as const,
    payload,
  });
};

export const closeModal = (modal: supportedModals) => {
  console.log(store.dispatch(removeWidget(modal)));
  store.dispatch({
    type: `${modal}/close` as const,
  });
};
type Key<T> = T extends { [key: string]: unknown } ? keyof T : never;

export const selectFrom = <
  T extends { [key in Key<supportedActions>]?: unknown }
>(
  modal: supportedModals
) => {
  type correctType = Extract<supportedActions, T>;
  const payload = useAppSelector(
    (appState) => appState[modal] as correctType & { visible: boolean }
  );

  return payload;
};

// export const startLoadingModal = (modal: supportedModals) => {
//   startLoading({
//     modal,
//   });
// };

// export const stopLoadingModal = (modal: supportedModals) => {
//   stopLoading({
//     type: modal,
//   });
// };
