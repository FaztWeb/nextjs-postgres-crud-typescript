import modifyModalReducer from 'components/Widgets/Modals/Modify/modify-modal-slice';
import infoModalReducer from 'components/Widgets/Modals/Info/info-modal-slice';
import pictureModalReducer from 'components/Widgets/Modals/Pictures/picture-modal-slice';
import authenticateReducer from 'components/Widgets/Modals/Authenticate/authenticate-slice';
import stackReducer from 'components/Widgets/stack-slice';
import pictureChangeModalReducer from 'components/Widgets/Modals/Pictures/Change/change-slice';
import popupReducer from 'components/Widgets/Popup/Success/success-slice';

export const widgetsReducer = {
  modifyModalReducer,
  infoModalReducer,
  pictureModalReducer,
  authenticateReducer,
  stackReducer,
  pictureChangeModalReducer,
  popupReducer,
} as const;
