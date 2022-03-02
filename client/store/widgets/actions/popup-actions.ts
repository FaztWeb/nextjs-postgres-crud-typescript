import { supportedPopup } from '../widgets-available';
import { PopupBuilder } from 'components/Widgets/Button/Submit/Submit';
import { addWidget, removeWidget } from 'components/Widgets/stack-slice';
import { store } from 'store/store';

export const openPopup = (
  popup: supportedPopup,
  payload: PopupBuilder | undefined = undefined
) => {
  store.dispatch(addWidget(popup));
  store.dispatch({
    type: `${popup}/open` as const,
    payload,
  });
};

export const closePopup = (popup: supportedPopup) => {
  store.dispatch(removeWidget(popup));
  store.dispatch({
    type: `${popup}/close` as const,
  });
};
