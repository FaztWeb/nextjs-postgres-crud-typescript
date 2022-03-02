import type { supportedModals } from '../widgets-available';
import type { supportedActions } from '../widgets-actions';
import { store } from 'store/store';
import { addWidget, removeWidget } from 'components/Widgets/stack-slice';
import { useAppSelector } from 'hooks/redux-hooks';

export const openModal = (
  modal: supportedModals,
  payload: supportedActions = undefined
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

export const selectFrom = (modal: 'pictureChangeModal') => {
  const { state, visible } = useAppSelector((appState) => appState[modal]);
  type stateType = Extract<
    typeof state,
    Extract<supportedActions, typeof state>
  >;

  return { state, visible } as {
    state: stateType;
    visible: boolean;
  };
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
