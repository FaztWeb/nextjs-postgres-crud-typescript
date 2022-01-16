import { AppProps } from 'next/app';
import '../styles.css';
import modalStyle from './modal.module.css';
import Modal from '../components/ModifyModal/Modal';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={modalStyle.conatiner}>
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
