import { createModalSlice } from 'store/widgets/widgets-creators';

const pictureChangeModalSlice = createModalSlice<
  'picture-change-name-modal',
  {
    oldFilename: string;
  }
>('picture-change-name-modal', {
  oldFilename: '',
});

export const { open, close } = pictureChangeModalSlice.actions;
export const name = pictureChangeModalSlice.name;
export default pictureChangeModalSlice.reducer;
