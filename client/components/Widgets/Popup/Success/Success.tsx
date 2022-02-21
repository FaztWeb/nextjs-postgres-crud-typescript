import Popup from '../Popup';
import { useAppSelector } from 'hooks/redux-hooks';
import { indexOf } from 'store';

const Success = () => {
  const visible = useAppSelector(({ successPopup }) => successPopup);
  const zIndex = indexOf('success-popup');
  return <Popup zIndex={zIndex} visible={visible}></Popup>;
};
export default Success;
