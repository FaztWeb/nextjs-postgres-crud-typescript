import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  initialState: {
    modal: '',
    isLoading: false,
  },
  name: 'loading',
  reducers: {
    startLoading(
      _,
      action: PayloadAction<{
        modal: string;
      }>
    ) {
      return {
        modal: action.payload.modal,
        isLoading: true,
      };
    },
    doneLoading(
      _,
      action: PayloadAction<{
        modal: string;
      }>
    ) {
      return {
        modal: action.payload.modal,
        isLoading: false,
      };
    },
  },
});

export const { startLoading, doneLoading } = loadingSlice.actions;
export const loadingReducers = loadingSlice.reducer;
