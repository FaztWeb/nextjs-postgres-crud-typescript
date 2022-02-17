import { createSlice } from '@reduxjs/toolkit';

const visible = false;

const pictureModalSlice = createSlice({
  initialState: {
    visible: false,
    zIndex: 0,
  },
  name: 'picture-modal',
  reducers: {
    open(_, action) {
      return {
        visible: true,
        zIndex: action.payload as number,
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
