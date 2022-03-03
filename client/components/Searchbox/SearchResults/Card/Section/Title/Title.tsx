import React, { FC } from 'react';
import Section from '../Section';
import { BiChurch } from 'react-icons/bi';
import { modal$ } from 'lib/modal';
import { useRouter } from 'next/router';
import { openModal } from 'store/widgets/actions/modals-actions';

const Title: FC<{ name: string }> = ({ name }) => {
  const handleClick = () => {
    openModal('blogs-modal', {
      name,
    });
  };
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
        sideEffects: handleClick,
      }}
    ></Section>
  );
};

export default Title;
