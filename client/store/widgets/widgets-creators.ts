import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const createModalSlice = <
  U extends string,
  T extends Record<string, unknown> | undefined = undefined
>(
  name: U,
  initialState?: T
) => {
  const slice = createSlice({
    initialState: { ...initialState, visible: false },
    name,
    reducers: {
      open(_, action: PayloadAction<T>) {
        return {
          ...action.payload,
          visible: true,
        } as const;
      },
      close(state) {
        return {
          ...state,
          visible: false,
        };
      },
    },
  });

  return slice;
};
