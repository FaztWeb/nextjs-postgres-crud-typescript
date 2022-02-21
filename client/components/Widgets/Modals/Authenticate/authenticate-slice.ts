import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authenticateModalSlice = createSlice({
  initialState: false,
  name: 'authenticate-modal',
  reducers: {
    open() {
      return true;
    },
    close() {
      return false;
    },
  },
});

export const { open, close } = authenticateModalSlice.actions;
export const name = authenticateModalSlice.name;
export default authenticateModalSlice.reducer;
