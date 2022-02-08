import { modal$ } from 'lib/modal';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

import '../styles.css';
import modalStyle from './modal.module.css';
import Modal from '../components/ModifyModal/Modal';
import { Provider } from 'react-redux';
import { store } from 'store';
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    modal$.subscribe((show) => {
      setShowModal(show);
      console.log(show);
    });
  }, []);
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
export default MyApp;
