import { configureStore } from '@reduxjs/toolkit';
import { buttonReducer } from 'components/ModifyModal/Button/button-slice';
import showSearchReducer from 'components/Searchbox/search-slice';
export const store = configureStore({
  reducer: {
    button: buttonReducer,
    showSearch: showSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
