import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const x = 0;
  return <Component {...pageProps} />;
}

export default MyApp;
