import { configureStore } from '@reduxjs/toolkit';
import { buttonReducer } from 'components/Widgets/Modals/Modify/Button/button-slice';
import showSearchReducer from 'components/Searchbox/search-slice';
import modifyModalReducer from 'components/Widgets/Modals/Modify/modify-slice';
import infoModalReducer from 'components/Widgets/Modals/Info/info-modal-slice';

export const store = configureStore({
  reducer: {
    button: buttonReducer,
    showSearch: showSearchReducer,
    infoModal: infoModalReducer,
    modifyModal: modifyModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
