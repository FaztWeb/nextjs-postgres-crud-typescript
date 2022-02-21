import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  initialState: false,
  name: 'popup',
  reducers: {
    open() {
      return true;
    },
    close() {
      return false;
    },
  },
});

export const { open, close } = popupSlice.actions;
export const name = popupSlice.name;
export default popupSlice.reducer;
