import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const stack = createSlice({
  initialState: [] as string[],
  name: 'stack',
  reducers: {
    addWidget: (stack, action: PayloadAction<string>) => {
      stack.push(action.payload);
      return [...stack];
    },
    removeWidget: (stack, action: PayloadAction<string>) => {
      stack.filter((v) => v !== action.payload);
      return [...stack];
    },
  },
});

export const { addWidget, removeWidget } = stack.actions;
export default stack.reducer;
