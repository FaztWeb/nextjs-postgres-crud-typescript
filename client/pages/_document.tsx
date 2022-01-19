import Document, { Html, Head, Main, NextScript } from 'next/document';

class MainDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <div
            id="modal-root"
            style={{
              position: 'absolute',
              zIndex: 100,
              width: 0,
              backgroundColor: 'red',
              bottom: 20,
              left: 20,
            }}
          ></div>
        </body>
      </Html>
    );
  }
}

export default MainDocument;
