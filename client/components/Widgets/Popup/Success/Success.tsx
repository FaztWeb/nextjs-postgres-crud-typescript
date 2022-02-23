import Popup from '../Popup';
import { useAppSelector } from 'hooks/redux-hooks';
import { indexOf } from 'store';
import { FaExclamationTriangle } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';

const Success = () => {
  const popup = useAppSelector(({ successPopup }) => successPopup);
  const zIndex = indexOf('success-popup');

  return (
    <AnimatePresence>
      {popup.visible ? (
        <Popup
          zIndex={zIndex}
          Icon={FaExclamationTriangle}
          payload={popup.popupMessage as string}
        ></Popup>
      ) : null}
    </AnimatePresence>
  );
};
export default Success;
