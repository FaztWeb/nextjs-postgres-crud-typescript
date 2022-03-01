import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const createModalSlice = <T extends Record<string, unknown>>(
  name: string,
  initialState: T
) => {
  const slice = createSlice({
    initialState: {
      [Object.keys(initialState)[0]]: initialState,
      visible: false,
    },
    name,
    reducers: {
      open(_, action: PayloadAction<T>) {
        return {
          [Object.keys(action.payload)[0]]: action.payload,
          visible: true,
        };
      },
      close() {
        return {
          visible: false,
        };
      },
    },
  });

  return slice;
};
