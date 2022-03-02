import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const createModalSlice = <
  U extends string,
  T extends Record<string, unknown> | undefined = undefined
>(
  name: U,
  initialState?: T
) => {
  const safeInitialState = initialState
    ? {
        [Object.keys(initialState)[0]]: initialState,
        visible: false,
      }
    : { visible: false };
  const slice = createSlice({
    initialState: safeInitialState,
    name,
    reducers: {
      open(_, action: PayloadAction<T> | undefined = undefined) {
        const safeAction = action?.payload
          ? {
              [Object.keys(action.payload)[0]]: action.payload,
              visible: true,
            }
          : {
              visible: true,
            };
        return safeAction;
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
