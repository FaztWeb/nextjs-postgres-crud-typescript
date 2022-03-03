import { createModalSlice } from 'store/widgets/widgets-creators';

const modifyModalSlice = createModalSlice<'modify-modal', { name: string }>(
  'modify-modal',
  { name: '' }
);

export const { open, close } = modifyModalSlice.actions;
export const name = modifyModalSlice.name;

export default modifyModalSlice.reducer;
