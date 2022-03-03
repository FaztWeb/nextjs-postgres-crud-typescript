import { createModalSlice } from 'store/widgets/widgets-creators';

const blogSlice = createModalSlice<'blogs-modal', { name: string }>(
  'blogs-modal',
  {
    name: '',
  }
);

export const name = blogSlice.name;
export const { close, open } = blogSlice.actions;
export default blogSlice.reducer;
