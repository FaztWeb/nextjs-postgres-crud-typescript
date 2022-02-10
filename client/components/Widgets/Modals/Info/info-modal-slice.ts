import { createSlice } from '@reduxjs/toolkit';

const isVisible = false;

const infoModal = createSlice({
  initialState: isVisible,
  name: 'infoModal',
  reducers: {
    close() {
      return false;
    },
    open() {
      return true;
    },
  },
});

export const { close, open } = infoModal.actions;
export default infoModal.reducer;
