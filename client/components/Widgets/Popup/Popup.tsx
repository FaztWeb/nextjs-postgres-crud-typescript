import actionStyle from './actionpopup.module.css';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { IconType } from 'react-icons/lib';

const Popup: FC<{
  zIndex: number;
  payload: JSX.Element | string | undefined;
  Icon: IconType;
}> = ({ zIndex, Icon, payload }) => {
  return (
    <motion.div
      style={{
        zIndex,
      }}
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
      {payload ? <div className={actionStyle.text}>{payload}</div> : null}
      <Icon className={actionStyle.icon} />
    </motion.div>
  );
};

export default Popup;
