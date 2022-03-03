import { createModalSlice } from 'store/widgets/widgets-creators';

const authenticateModalSlice =
  createModalSlice<'authenticate-modal'>('authenticate-modal');
export const { open, close } = authenticateModalSlice.actions;
export const name = authenticateModalSlice.name;
export default authenticateModalSlice.reducer;
