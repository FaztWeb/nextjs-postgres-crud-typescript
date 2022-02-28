import section__styles from './section.module.css';
import { RiArrowRightSLine, RiArrowDownSLine } from 'react-icons/ri';
import { useState } from 'react';
import Data from './Data/Data';
const Section = () => {
  const [state, setState] = useState<'Open' | 'Close'>('Close');
  const openSection = () => {
    setState(state === 'Close' ? 'Open' : 'Close');
  };
  return (
    <div className={section__styles.container}>
      <div
        className={section__styles.selector__container}
        tabIndex={0}
        onClick={openSection}
      >
        Postarile mele
        {state === 'Close' ? (
          <RiArrowRightSLine className={section__styles.icon} />
        ) : (
          <RiArrowDownSLine className={section__styles.icon} />
        )}
      </div>
      {state === 'Open' ? <Data></Data> : null}
    </div>
  );
};
export default Section;
