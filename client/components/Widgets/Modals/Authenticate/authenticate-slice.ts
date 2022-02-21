import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authenticateModalSlice = createSlice({
  initialState: {
    visible: false,
    zIndex: 0,
  },
  name: 'authenticate-modal',
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

export const { open, close } = authenticateModalSlice.actions;
export const name = authenticateModalSlice.name;
export default authenticateModalSlice.reducer;
