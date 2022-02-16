import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  initialState: false,
  name: 'popup',
  reducers: {
    show() {
      return true;
    },
    hide() {
      return false;
    },
  },
});

export const { hide, show } = popupSlice.actions;
export default popupSlice.reducer;
