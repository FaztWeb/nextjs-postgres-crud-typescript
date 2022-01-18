import showPopup from 'lib/action';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const ActionPopup = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    showPopup.subscribe(setShow);
    console.log(setShow);
  }, []);

  const component = show ? (
    <div
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: 'blue',
      }}
    >
      HELLO
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      component,
      document.getElementById('modal-root') as Element
    );
  }
  return null;
};

export default ActionPopup;
