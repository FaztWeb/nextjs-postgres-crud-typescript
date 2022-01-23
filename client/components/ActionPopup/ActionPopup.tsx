import actionStyle from './actionpopup.module.css';
import { FaInfoCircle } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

const ActionPopup = ({ visible }: { visible: boolean }) => {
  useEffect(() => {
    console.log(visible);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{
            opacity: 0,
            x: -200,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: 200,
          }}
          className={actionStyle.container}
        >
          <div className={actionStyle.text}>
            Schimbarile au fost salvate cu success
          </div>
          <FaInfoCircle className={actionStyle.icon} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ActionPopup;
