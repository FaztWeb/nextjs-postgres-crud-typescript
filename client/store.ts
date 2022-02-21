import { configureStore } from '@reduxjs/toolkit';
import { buttonReducer } from 'components/Widgets/Button/button-slice';
import showSearchReducer from 'components/Searchbox/search-slice';
import popupReducer from 'components/Widgets/Popup/popup-slice';

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

import stackReducer from 'components/Widgets/stack-slice';
import { useAppSelector } from 'hooks/redux-hooks';

export const store = configureStore({
  reducer: {
    button: buttonReducer,
    stack: stackReducer,
    showPopup: popupReducer,
    showSearch: showSearchReducer,
    infoModal: infoModalReducer,
    modifyModal: modifyModalReducer,
    pictureModal: pictureModalReducer,
    authenticateModal: authenticateReducer,
  },
});
const supportedModalActions = ['open', 'close'] as const;
const modals = [
  modifyModalName,
  infoName,
  pictureName,
  authenticateName,
] as const;

const modalActions = modals.flatMap((modal) =>
  supportedModalActions.map((action) => `${modal}/${action}` as const)
);
export type ModalActions = typeof modalActions[number];

export const action = (
  actionType: ModalActions,
  payload: ReturnType<typeof open>['payload']
) => {
  return {
    type: actionType,
    payload,
  };
};

export const indexOf = (widget: typeof modals[number]) => {
  const Index = useAppSelector(({ stack }) => {
    return stack.indexOf(widget);
  });
  return Index;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
