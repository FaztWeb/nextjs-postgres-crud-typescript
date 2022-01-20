import actionStyle from './actionpopup.module.css';
import { FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ActionPopup = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -200,
      }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.5,
        type: 'tween',
      }}
      className={actionStyle.container}
    >
      <div className={actionStyle.text}>
        Schimbarile au fost salvate cu success
      </div>
      <FaInfoCircle className={actionStyle.icon} />
    </motion.div>
  );
};

export default ActionPopup;
