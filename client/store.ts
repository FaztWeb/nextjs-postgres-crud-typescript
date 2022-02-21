import { configureStore } from '@reduxjs/toolkit';
import { buttonReducer } from 'components/Widgets/Button/button-slice';
import showSearchReducer from 'components/Searchbox/search-slice';

// modal imports
import modifyModalReducer, {
  name as modifyModalName,
} from 'components/Widgets/Modals/Modify/modify-modal-slice';
import infoModalReducer, {
  open,
  name as infoName,
} from 'components/Widgets/Modals/Info/info-modal-slice';

import pictureModalReducer, {
  name as pictureName,
} from 'components/Widgets/Modals/Pictures/picture-modal-slice';
import authenticateReducer, {
  name as authenticateName,
} from 'components/Widgets/Modals/Authenticate/authenticate-slice';

// widget stack
import stackReducer, {
  addWidget,
  removeWidget,
} from 'components/Widgets/stack-slice';
import { useAppSelector } from 'hooks/redux-hooks';

// popup imports
import popupReducer, {
  name as popupName,
} from 'components/Widgets/Popup/Success/success-slice';

export const store = configureStore({
  reducer: {
    button: buttonReducer,
    showSearch: showSearchReducer,
    stack: stackReducer,

    // popup reducers
    successPopup: popupReducer,

    // modal reducers
    infoModal: infoModalReducer,
    modifyModal: modifyModalReducer,
    pictureModal: pictureModalReducer,
    authenticateModal: authenticateReducer,
  },
});

// actions
const supportedModalActions = ['open', 'close'] as const;

const modals = [
  modifyModalName,
  infoName,
  pictureName,
  authenticateName,
] as const;

const popups = [popupName] as const;

export type supportedModals = typeof modals[number];
export type supportedPopup = typeof popups[number];

export const openModal = (modal: supportedModals) => {
  console.log(store.dispatch(addWidget(modal)));
  store.dispatch({
    type: `${modal}/open` as const,
  });
};

export const closeModal = (modal: supportedModals) => {
  console.log(store.dispatch(removeWidget(modal)));
  store.dispatch({
    type: `${modal}/close` as const,
  });
};

export const openPopup = (popup: supportedPopup) => {
  store.dispatch(addWidget(popup));
  store.dispatch({
    type: `${popup}/open` as const,
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
