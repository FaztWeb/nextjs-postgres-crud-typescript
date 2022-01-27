import { modal$ } from 'lib/modal';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

import '../styles.css';
import modalStyle from './modal.module.css';
import Modal from '../components/ModifyModal/Modal';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    modal$.subscribe(setShowModal);
  }, []);
  return (
    <SessionProvider session={session}>
      <div className={modalStyle.conatiner}>
        {showModal ? (
          <div className={modalStyle.modal__container}>
            <Modal />
          </div>
        ) : null}
        <div className={modalStyle.app}>
          <Component {...pageProps} />;
        </div>
      </div>
    </SessionProvider>
  );
}
export default MyApp;
