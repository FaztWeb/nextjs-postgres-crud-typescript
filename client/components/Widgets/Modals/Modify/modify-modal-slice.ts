import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const modifyModalSlice = createSlice({
  name: 'modify-modal',
  initialState: {
    churchName: '',
    visible: false,
  },
  reducers: {
    open(_, action: PayloadAction<string>) {
      return {
        churchName: action.payload,
        visible: true,
      };
    },

    close() {
      return {
        churchName: '',
        visible: false,
      };
    },
  },
});

export const { open, close } = modifyModalSlice.actions;
export const name = modifyModalSlice.name;

export default modifyModalSlice.reducer;
