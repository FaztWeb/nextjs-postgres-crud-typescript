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
    processUserInput(state, action: PayloadAction<string>) {
      console.log('AAAAAAAAAAAAAAAAAAAA');
      return {
        ...state,
        currentUserInfo: action.payload,
      };
    },
  },
});

export const { update, processUserInput } = changeInfo.actions;
export const name = changeInfo.name;
export default changeInfo.reducer;
