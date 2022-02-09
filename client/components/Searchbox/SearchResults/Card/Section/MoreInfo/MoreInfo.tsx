import React, { FC } from 'react';
import Section from '../Section';
import more_info_style from './moreinfo.module.css';
import { TiInfoLarge } from 'react-icons/ti';

const MoreInfo: FC<{ name: string }> = ({ name }) => {
  return (
    <Section
      iconContent={{
        element: <TiInfoLarge />,
        size: 'small',
      }}
      isNavigable={true}
      mainContent={{
        element: (
          <>
            Aflati mai multe informatii despre{' '}
            <span tabIndex={0} className={more_info_style.church__name__info}>
              {name}
            </span>
          </>
        ),
        position: 'last',
        iconAlign: 'center',
        sideEffects: () => {
          return;
        },
      }}
    />
  );
};

export default MoreInfo;
