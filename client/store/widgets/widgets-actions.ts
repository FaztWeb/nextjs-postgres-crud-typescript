import { store } from '../store';
import { startLoading } from 'components/Loading/loading-slice';
import { useAppSelector } from 'hooks/redux-hooks';
// modal imports
import { open as modifyOpen } from 'components/Widgets/Modals/Modify/modify-modal-slice';
import { open as infoOpen } from 'components/Widgets/Modals/Info/info-modal-slice';
import { open as pictureChangeOpen } from 'components/Widgets/Modals/Pictures/Change/change-slice';
import { open as pictureOpen } from 'components/Widgets/Modals/Pictures/picture-modal-slice';
import { open as authenticateOpen } from 'components/Widgets/Modals/Authenticate/authenticate-slice';

// widget stack
import { addWidget, removeWidget } from 'components/Widgets/stack-slice';

// popup imports
// import {
//   name as popupName,
//   Popup,
// } from 'components/Widgets/Popup/Success/success-slice';
import { PopupBuilder } from 'components/Widgets/Button/Submit/Images/SubmitImages';
import { supportedModals, supportedPopup } from './widgets-available';

const openActions = [
  modifyOpen,
  infoOpen,
  pictureOpen,
  authenticateOpen,
  pictureChangeOpen,
] as const;

export type supportedActions = Parameters<typeof openActions[number]>[0];

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

export const closeModal = <T extends supportedModals>(modal: T) => {
  console.log(store.dispatch(removeWidget(modal)));
  store.dispatch({
    type: `${modal}/close` as const,
  });
};

export const openPopup = (popup: supportedPopup, payload: PopupBuilder) => {
  store.dispatch(addWidget(popup));
  store.dispatch({
    type: `${popup}/open` as const,
    payload,
  });
};

export const closePopup = (popup: supportedPopup) => {
  store.dispatch(removeWidget(popup));
  store.dispatch({
    type: `${popup}/close` as const,
  });
};

export const indexOf = (widget: supportedModals | supportedPopup) => {
  const Index = useAppSelector(({ stack }) => {
    let index = stack.indexOf(widget);
    if (index >= 0) index += 100;
    return index;
  });
  return Index;
};

export const startLoadingModal = (modal: supportedModals) => {
  startLoading({
    modal,
  });
};

// export const stopLoadingModal = (modal: supportedModals) => {
//   stopLoading({
//     type: modal,
//   });
// };
