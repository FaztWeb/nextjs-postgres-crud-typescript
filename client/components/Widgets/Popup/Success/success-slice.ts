import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PopupBuilder } from 'components/Widgets/Button/Submit/Submit';

export interface Popup {
  visible: boolean;
  popupType?: 'Error' | 'Success';
  popupMessage?: string | JSX.Element;
}

const popupSlice = createSlice({
  initialState: {} as Popup,
  name: 'success-popup',
  reducers: {
    open(_, action: PayloadAction<PopupBuilder>) {
      return action.payload.type === 'Error'
        ? {
            visible: true,
            popupType: 'Error' as const,
            popupMessage: action.payload.payload,
          }
        : {
            visible: true,
            popupType: 'Success' as const,
            popupMessage: action.payload.payload,
          };
    },
    close() {
      return {
        visible: false,
      };
    },
  },
});

export const { open, close } = popupSlice.actions;
export const name = popupSlice.name;
export default popupSlice.reducer;
