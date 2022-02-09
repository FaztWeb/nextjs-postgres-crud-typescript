import Map from '../components/Map/Map';
import modalStyle from './modal.module.css';
import Modal from '../components/ModifyModal/Modal';
import Navbar from 'components/Navbar/Navbar';
import { useAppSelector } from 'hooks/redux-hooks';
import Searchbox from 'components/Searchbox/Searchbox';

const Main = () => {
  const visible = useAppSelector(({ showSearch }) => showSearch);
  return (
    <div className={modalStyle.container}>
      <Navbar />
      {/*false ? (
        <div className={modalStyle.modal__container}>
          <Modal />
        </div>
      ) : null} */}
      <div className={modalStyle.app}>
        <Map />
        {visible ? <Searchbox /> : null}
      </div>
    </div>
  );
};

export default Main;
