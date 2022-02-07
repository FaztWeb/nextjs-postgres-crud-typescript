import React, { FC } from 'react';
import Section from '../Section';
import { BiChurch } from 'react-icons/bi';

const Title: FC<{ name: string }> = ({ name }) => {
  return (
    <Section
      isNavigable={true}
      iconContent={{
        element: <BiChurch />,
        size: 'large',
      }}
      mainContent={{
        element: (
          <div
            style={{
              textTransform: 'uppercase',
            }}
          >
            {name}
          </div>
        ),
        iconAlign: 'center',
        position: 'first',
      }}
    ></Section>
  );
};

export default Title;
