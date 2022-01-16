import { AppProps } from 'next/app';
import '../styles.css';
import modalStyle from './modal.module.css';
import Modal from '../components/ModifyModal/Modal';
import Popup from 'components/Popup/Popup';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={modalStyle.conatiner}>
      <Popup message="" />
      <div className={modalStyle.modal__container}>
        <Modal />
      </div>
      <div className={modalStyle.app}>
        <Component {...pageProps} />;
      </div>
    </div>
  );
}

export default MyApp;
