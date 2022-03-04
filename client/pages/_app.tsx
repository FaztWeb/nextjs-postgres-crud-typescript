import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '../styles.css';
import { Provider } from 'react-redux';
import { store } from 'store/store';
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
export default MyApp;
