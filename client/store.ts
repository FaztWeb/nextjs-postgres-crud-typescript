import { configureStore } from '@reduxjs/toolkit';
import { buttonReducer } from 'components/Widgets/Button/button-slice';
import showSearchReducer from 'components/Searchbox/search-slice';
import popupReducer from 'components/Widgets/Popup/popup-slice';

// modal imports
import modifyModalReducer, {
  name as modifyModalName,
} from 'components/Widgets/Modals/Modify/modify-modal-slice';
import infoModalReducer, {
  name as infoName,
} from 'components/Widgets/Modals/Info/info-modal-slice';

export const store = configureStore({
  reducer: {
    button: buttonReducer,
    showSearch: showSearchReducer,
    infoModal: infoModalReducer,
    modifyModal: modifyModalReducer,
    showPopup: popupReducer,
  },
});
const supportedModalActions = ['open', 'close'] as const;
const modals = [modifyModalName, infoName] as const;
const modalActionsArr = modals.flatMap((modal) =>
  supportedModalActions.map((action) => `${modal}/${action}` as const)
);
export const modalActions = modalActionsArr[0];

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
