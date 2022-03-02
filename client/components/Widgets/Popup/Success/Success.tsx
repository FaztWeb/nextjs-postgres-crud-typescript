import Popup from '../Popup';
import { useAppSelector } from 'hooks/redux-hooks';
import { indexOf } from 'store/widgets/widgets-actions';
import { FaExclamationTriangle } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import success_styles from './success.module.css';
const Success = () => {
  const popup = useAppSelector(({ successPopup }) => successPopup);
  const zIndex = indexOf('success-popup');

  return (
    <AnimatePresence>
      {popup.visible ? (
        <Popup
          zIndex={zIndex}
          Icon={FaExclamationTriangle}
          payload={popup.popupMessage}
        ></Popup>
      ) : null}
    </AnimatePresence>
  );
};
export default Success;
