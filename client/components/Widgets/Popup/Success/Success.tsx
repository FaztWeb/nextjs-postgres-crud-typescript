import Popup from '../Popup';
import { useAppSelector } from 'hooks/redux-hooks';
import { indexOf } from 'store/widgets/widgets-actions';
import { FaExclamationTriangle } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import success_styles from './success.module.css';
const Success = () => {
  const { visible, popupMessage } = useAppSelector(
    ({ popupReducer }) => popupReducer
  );
  const zIndex = indexOf('success-popup');

  return (
    <AnimatePresence>
      {visible ? (
        <Popup
          zIndex={zIndex}
          Icon={FaExclamationTriangle}
          payload={popupMessage}
        ></Popup>
      ) : null}
    </AnimatePresence>
  );
};
export default Success;
