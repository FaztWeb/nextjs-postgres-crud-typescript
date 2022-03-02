import { createModalSlice } from 'store/widgets/widgets-creators';

const infoModalSlice = createModalSlice<'info-modal', { name: string }>(
  'info-modal',
  {
    name: '',
  }
);

export const { close, open } = infoModalSlice.actions;
export const name = infoModalSlice.name;
export default infoModalSlice.reducer;
