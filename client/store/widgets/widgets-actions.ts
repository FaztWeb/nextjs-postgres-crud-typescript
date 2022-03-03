import { useAppSelector } from 'hooks/redux-hooks';

import { open as modifyOpen } from 'components/Widgets/Modals/Modify/modify-modal-slice';
import { open as infoOpen } from 'components/Widgets/Modals/Info/info-modal-slice';
import { open as pictureChangeOpen } from 'components/Widgets/Modals/Pictures/Change/change-slice';
import { open as pictureOpen } from 'components/Widgets/Modals/Pictures/picture-modal-slice';
import { open as authenticateOpen } from 'components/Widgets/Modals/Authenticate/authenticate-slice';
import { open as blogsOpen } from 'components/Widgets/Modals/Blogs/blogs-slice';
import { supportedModals, supportedPopup } from './widgets-available';

const openActions = [
  modifyOpen,
  infoOpen,
  pictureOpen,
  authenticateOpen,
  pictureChangeOpen,
  blogsOpen,
] as const;

export type supportedActions = Parameters<typeof openActions[number]>[0];

export const indexOf = (widget: supportedModals | supportedPopup) => {
  const Index = useAppSelector(({ stackReducer }) => {
    let index = stackReducer.indexOf(widget);
    if (index >= 0) index += 100;
    return index;
  });
  return Index;
};
