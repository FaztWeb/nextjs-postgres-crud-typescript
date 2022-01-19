import showPopup from 'lib/action';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import actionStyle from './actionpopup.module.css';
import { FaInfoCircle } from 'react-icons/fa';
import { motion } from "framer-motion";

const ActionPopup = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    showPopup.subscribe(setShow);
    console.log(setShow);
  }, []);

  const component = (
    show ? <motion.div
      initial={{
        opacity: 0,
        x: -200
      }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.5,
        type: "tween"
      }}
      className={actionStyle.container}
    >
      <div className={actionStyle.text}>
        Schimbarile au fost salvate cu success
      </div>
      <FaInfoCircle className={actionStyle.icon} />
    </motion.div>
      : null
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      component,
      document.getElementById('modal-root') as Element
    );
  }
  return null;
};

export default ActionPopup;
