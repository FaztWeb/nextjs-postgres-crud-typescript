import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const infoModal = createSlice({
  name: 'info-modal',
  initialState: {
    church: '',
    visible: false,
  },
  reducers: {
    open(
      _,
      action: PayloadAction<{
        church: string;
      }>
    ) {
      return {
        church: action.payload.church,
        visible: true,
      };
    },
    close() {
      return {
        church: '',
        visible: false,
      };
    },
  },
});

export const { close, open } = infoModal.actions;
export const name = infoModal.name;
export default infoModal.reducer;
