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

export const selectFrom = <T extends supportedActions>(
  modal: supportedModals
) => {
  const payload = useAppSelector((appState) => appState[modal]);

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
