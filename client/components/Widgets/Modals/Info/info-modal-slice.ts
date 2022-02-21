import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const infoModal = createSlice({
  name: 'info-modal',
  initialState: false,
  reducers: {
    open() {
      return true;
    },
    close() {
      return false;
    },
  },
});

export const { close, open } = infoModal.actions;
export const name = infoModal.name;
export default infoModal.reducer;
