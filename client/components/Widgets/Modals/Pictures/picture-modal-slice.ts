import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const pictureModalSlice = createSlice({
  initialState: {
    visible: false,
    zIndex: 0,
  },
  name: 'picture-modal',
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

export const { open, close } = pictureModalSlice.actions;
export const name = pictureModalSlice.name;
export default pictureModalSlice.reducer;
