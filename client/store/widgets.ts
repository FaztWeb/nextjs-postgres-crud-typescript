import { store } from './store';
import { startLoading } from 'components/Loading/loading-slice';
// modal imports
import modifyModalReducer, {
  open as modifyOpen,
  name as modifyModalName,
  close as modifyClose,
} from 'components/Widgets/Modals/Modify/modify-modal-slice';
import infoModalReducer, {
  open as infoOpen,
  close as infoClose,
  name as infoName,
} from 'components/Widgets/Modals/Info/info-modal-slice';

import pictureModalReducer, {
  open as pictureOpen,
  name as pictureName,
  close as pictureClose,
} from 'components/Widgets/Modals/Pictures/picture-modal-slice';
import authenticateReducer, {
  open as authenticateOpen,
  name as authenticateName,
  close as authenticateClose,
} from 'components/Widgets/Modals/Authenticate/authenticate-slice';

// widget stack
import stackReducer, {
  addWidget,
  removeWidget,
} from 'components/Widgets/stack-slice';
import { useAppSelector } from 'hooks/redux-hooks';

import pictureChangeModalReducer, {
  open as pictureChangeOpen,
  close as pictureChangeClose,
  name as pictureChangeName,
} from 'components/Widgets/Modals/Pictures/Change/change-slice';

// popup imports
import popupReducer, {
  name as popupName,
  Popup,
} from 'components/Widgets/Popup/Success/success-slice';
import { PopupBuilder } from 'components/Widgets/Button/Submit/Images/SubmitImages';
const modals = [
  modifyModalName,
  infoName,
  pictureName,
  authenticateName,
  pictureChangeName,
] as const;

const openActions = [
  modifyOpen,
  infoOpen,
  pictureOpen,
  authenticateOpen,
  pictureChangeOpen,
] as const;

const popups = [popupName] as const;

export type supportedModals = typeof modals[number];
export type supportedPopup = typeof popups[number];
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

export const widgetsReducer = {
  modifyModalReducer,
  infoModalReducer,
  pictureModalReducer,
  authenticateReducer,
  stackReducer,
  pictureChangeModalReducer,
  popupReducer,
} as const;
