import { createSlice } from '@reduxjs/toolkit';

const isVisible = false;

const infoModal = createSlice({
  initialState: isVisible,
  name: 'info-modal',
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
export const name = infoModal.name;
export default infoModal.reducer;
