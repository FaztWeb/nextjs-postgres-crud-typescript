import sortby__styles from './sortby.module.css';
import { AnimateSharedLayout, motion } from 'framer-motion';
import { useState } from 'react';
const SortBy = () => {
  const [hover, setHover] = useState<'Popularitate' | 'Data postata'>(
    'Popularitate'
  );
  return (
    <div className={sortby__styles.container}>
      Sorteaza dupa:
      <AnimateSharedLayout>
        <div className={sortby__styles.choice}>
          <motion.div
            onMouseEnter={() => {
              setHover('Popularitate');
            }}
            className={sortby__styles.option}
          >
            Popularitate{' '}
            {hover === 'Popularitate' ? (
              <motion.div
                layoutId="underline"
                className={sortby__styles.underline}
              ></motion.div>
            ) : null}
          </motion.div>

          <motion.div
            onMouseEnter={() => {
              setHover('Data postata');
            }}
            className={sortby__styles.option}
          >
            Data postata{' '}
            {hover === 'Data postata' ? (
              <motion.div
                layoutId="underline"
                className={sortby__styles.underline}
              ></motion.div>
            ) : null}
          </motion.div>
        </div>
      </AnimateSharedLayout>
    </div>
  );
};

export default SortBy;
