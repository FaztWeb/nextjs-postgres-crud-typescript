import { createSlice } from '@reduxjs/toolkit';

const visible = false;

const pictureModalSlice = createSlice({
  initialState: visible,
  name: 'picture-modal',
  reducers: {
    open() {
      return true;
    },
    close() {
      return false;
    },
  },
});

export const { open, close } = pictureModalSlice.actions;
export const name = pictureModalSlice.name;
export default pictureModalSlice.reducer;
