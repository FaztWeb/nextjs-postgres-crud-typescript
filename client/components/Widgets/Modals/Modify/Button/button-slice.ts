import { createSlice } from '@reduxjs/toolkit';

const buttonSlice = createSlice({
  initialState: false,
  name: 'button',
  reducers: {
    showTooltip: () => {
      return true;
    },
    hideTooltip: () => {
      return false;
    },
  },
});

export const buttonReducer = buttonSlice.reducer;
export const { hideTooltip, showTooltip } = buttonSlice.actions;
