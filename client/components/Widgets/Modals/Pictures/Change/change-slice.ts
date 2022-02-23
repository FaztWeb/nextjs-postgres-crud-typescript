import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const pictureChangeModalSlice = createSlice({
  name: 'picture-change-name-modal',
  initialState: {
    visible: false,
    pictureToChange: '',
  },
  reducers: {
    open(
      _,
      action: PayloadAction<{
        picture: string;
      }>
    ) {
      return {
        visible: true,
        pictureToChange: action.payload.picture,
      };
    },
    close() {
      return {
        visible: false,
        pictureToChange: '',
      };
    },
  },
});

export const { open, close } = pictureChangeModalSlice.actions;
export const name = pictureChangeModalSlice.name;

export default pictureChangeModalSlice.reducer;
