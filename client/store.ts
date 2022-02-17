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

export const store = configureStore({
  reducer: {
    button: buttonReducer,
    showPopup: popupReducer,
    showSearch: showSearchReducer,
    infoModal: infoModalReducer,
    modifyModal: modifyModalReducer,
    pictureModal: pictureModalReducer,
  },
});
const supportedModalActions = ['open', 'close'] as const;
const modals = [modifyModalName, infoName, pictureName] as const;
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
