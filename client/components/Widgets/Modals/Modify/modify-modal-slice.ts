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

export const name = modifyModalSlice.name;
export default modifyModalSlice.reducer;
