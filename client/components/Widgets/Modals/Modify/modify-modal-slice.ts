import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const modifyModalSlice = createSlice({
  name: 'modify-modal',
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

export const { open, close } = modifyModalSlice.actions;
export const name = modifyModalSlice.name;

export default modifyModalSlice.reducer;
