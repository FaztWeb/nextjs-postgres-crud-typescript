import { AppProps } from 'next/app';
import '../styles.scss';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
