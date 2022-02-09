import { createSlice } from '@reduxjs/toolkit';

const visible = false;

const searchSlice = createSlice({
  initialState: visible,
  name: 'searchbar',
  reducers: {
    open() {
      return true;
    },
    close() {
      return false;
    },
  },
});

export const { open, close } = searchSlice.actions;
export default searchSlice.reducer;
