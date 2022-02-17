import React, { FC } from 'react';
import Carousel from '../../Carousel/Carousel';
import Section from '../Section';
import image_slider_style from './imageslider.module.css';
import { MdInsertPhoto } from 'react-icons/md';
import Button from 'components/Searchbox/SearchResults/Card/Section/ImageSlider/Buttons/Button';
import { BiImageAdd } from 'react-icons/bi';
import { useAppDispatch } from 'hooks/redux-hooks';
import { action } from 'store';

const ImageSlider: FC<{ name: string }> = ({ name }) => {
  const dispatch = useAppDispatch();
  function openModal() {
    dispatch(
      action('modify-modal/open', {
        zIndex: 1000,
      })
    );
  }

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
              <Button
                onClick={openModal}
                text="Adaugati Imagini"
                icon={<BiImageAdd />}
              />
            </div>
          </>
        ),
        iconAlign: 'top',
        position: 'middle',
        sideEffects: () => {
          return;
        },
      }}
    />
  );
};

export default ImageSlider;
