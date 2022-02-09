import { createSlice } from '@reduxjs/toolkit';

const visible = false;

const searchSlice = createSlice({
  initialState: visible,
  name: 'searchbar',
  reducers: {
    toggle(state) {
      return !state;
    },
  },
});

export const { toggle } = searchSlice.actions;
export default searchSlice.reducer;
