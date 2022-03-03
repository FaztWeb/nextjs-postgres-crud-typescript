import { createModalSlice } from 'store/widgets/widgets-creators';

const pictureModalSlice = createModalSlice<'picture-modal'>('picture-modal');

export const { open, close } = pictureModalSlice.actions;
export const name = pictureModalSlice.name;
export default pictureModalSlice.reducer;
