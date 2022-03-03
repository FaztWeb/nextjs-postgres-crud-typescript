import { name as modifyModalName } from 'components/Widgets/Modals/Modify/modify-modal-slice';
import { name as infoName } from 'components/Widgets/Modals/Info/info-modal-slice';
import { name as pictureName } from 'components/Widgets/Modals/Pictures/picture-modal-slice';
import { name as authenticateName } from 'components/Widgets/Modals/Authenticate/authenticate-slice';
import { name as pictureChangeName } from 'components/Widgets/Modals/Pictures/Change/change-slice';
import { name as popupName } from 'components/Widgets/Popup/Success/success-slice';
import { name as blogsName } from 'components/Widgets/Modals/Blogs/blogs-slice';

const modals = [
  modifyModalName,
  infoName,
  pictureName,
  authenticateName,
  pictureChangeName,
  blogsName,
] as const;

const popups = [popupName] as const;

export type supportedModals = typeof modals[number];
export type supportedPopup = typeof popups[number];
