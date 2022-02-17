import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const infoModal = createSlice({
  initialState: {
    visible: false,
    zIndex: 0,
  },
  name: 'info-modal',
  reducers: {
    close() {
      return {
        visible: false,
        zIndex: 0,
      };
    },
    open(_, action: PayloadAction<{ zIndex: number }>) {
      return {
        visible: true,
        zIndex: action.payload.zIndex,
      };
    },
  },
});

export const { close, open } = infoModal.actions;
export const name = infoModal.name;
export default infoModal.reducer;
