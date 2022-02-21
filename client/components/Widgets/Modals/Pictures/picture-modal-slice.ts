import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const pictureModalSlice = createSlice({
  name: 'picture-modal',
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

export const { open, close } = pictureModalSlice.actions;
export const name = pictureModalSlice.name;
export default pictureModalSlice.reducer;
