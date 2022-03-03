import modifyModalReducer, {
  name as modifyModalReducerName,
} from 'components/Widgets/Modals/Modify/modify-modal-slice';
import infoModalReducer, {
  name as infoModalReducerName,
} from 'components/Widgets/Modals/Info/info-modal-slice';
import pictureModalReducer, {
  name as pictureModalReducerName,
} from 'components/Widgets/Modals/Pictures/picture-modal-slice';
import authenticateReducer, {
  name as authenticateReducerName,
} from 'components/Widgets/Modals/Authenticate/authenticate-slice';
import stackReducer from 'components/Widgets/stack-slice';
import pictureChangeModalReducer, {
  name as pictureChangeModalReducerName,
} from 'components/Widgets/Modals/Pictures/Change/change-slice';
import popupReducer from 'components/Widgets/Popup/Success/success-slice';
import blogModalReducer, {
  name as blogModalReducerName,
} from 'components/Widgets/Modals/Blogs/blogs-slice';
export const widgets = {
  [modifyModalReducerName]: modifyModalReducer,
  [infoModalReducerName]: infoModalReducer,
  [pictureModalReducerName]: pictureModalReducer,
  [authenticateReducerName]: authenticateReducer,
  [pictureChangeModalReducerName]: pictureChangeModalReducer,
  [blogModalReducerName]: blogModalReducer,
  popupReducer: popupReducer,
  stackReducer,
} as const;
