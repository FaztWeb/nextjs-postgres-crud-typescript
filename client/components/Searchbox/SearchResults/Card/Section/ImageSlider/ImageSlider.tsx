import React, { FC } from 'react';
import Carousel from '../../Carousel/Carousel';
import Section from '../Section';
import image_slider_style from './imageslider.module.css';
import { BiImageAdd } from 'react-icons/bi';
import { MdInsertPhoto } from 'react-icons/md';
import ClickOverlay from 'components/ClickOverlay/ClickOverlay';

const ImageSlider: FC<{ name: string }> = ({ name }) => {
  return (
    <Section
      iconContent={{
        element: <MdInsertPhoto />,
        size: 'small',
      }}
      isNavigable={false}
      mainContent={{
        element: (
          <>
            <Carousel church={name} />
            <div className={image_slider_style.add_more__section}>
              <ClickOverlay>
                <div className={image_slider_style.add_more_container}>
                  <div className={image_slider_style.add_more__text}>
                    Adauga Fotografii
                  </div>
                  <BiImageAdd
                    className={`${image_slider_style.extra_small__icon}`}
                  />
                </div>
              </ClickOverlay>
            </div>
          </>
        ),
        iconAlign: 'top',
        position: 'middle',
      }}
    />
  );
};

export default ImageSlider;
