import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProvidedInput {
  lastUpdatedInfo: string;
  currentUserInfo: string;
  churchName: string;
}
const changeInfo = createSlice({
  name: 'change-info',
  initialState: {} as UserProvidedInput,
  reducers: {
    update(state, action: PayloadAction<string>) {
      return {
        ...state,
        lastUpdatedInfo: action.payload,
      };
    },
    processUserInput(
      state,
      action: PayloadAction<{
        info: string;
        churchName: string;
      }>
    ) {
      return {
        ...state,
        churchName: action.payload.churchName,
        currentUserInfo: action.payload.info,
      };
    },
  },
});

export const { update, processUserInput } = changeInfo.actions;
export const name = changeInfo.name;
export default changeInfo.reducer;
