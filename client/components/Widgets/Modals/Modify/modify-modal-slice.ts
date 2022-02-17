import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const modifyModalSlice = createSlice({
  initialState: {
    visible: false,
    zIndex: 0,
  },
  name: 'modify-modal',
  reducers: {
    open(
      _,
      action: PayloadAction<{
        zIndex: number;
      }>
    ) {
      return {
        visible: true,
        zIndex: action.payload.zIndex,
      };
    },
    close() {
      return {
        visible: false,
        zIndex: 0,
      };
    },
  },
});

export const name = modifyModalSlice.name;
export default modifyModalSlice.reducer;
