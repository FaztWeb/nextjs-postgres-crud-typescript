import Slider, { LazyLoadTypes } from 'react-slick';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import carouselStyles from './carousel.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';

const Carousel = () => {
  const [photos, setPhotos] = useState([]);
  const NextArrow = ({ onClick }: { onClick?: React.MouseEventHandler }) => {
    return (
      <div
        className={`${carouselStyles.arrow} ${carouselStyles.next}`}
        onClick={onClick}
      >
        <FaArrowRight />
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/images/images');
      const files = await response.json();
      console.log(files);
    })();
  }, []);

  const PrevArrow = ({ onClick }: { onClick?: React.MouseEventHandler }) => {
    return (
      <div
        className={`${carouselStyles.arrow} ${carouselStyles.prev}`}
        onClick={onClick}
      >
        <FaArrowLeft />
      </div>
    );
  };

  const settings = {
    infinite: true,
    lazyLoad: 'ondemand' as LazyLoadTypes,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '0',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className={carouselStyles.container}>
      <Slider {...settings}>
        {photos.map((img, index) => (
          <div key={index} className={carouselStyles.slide}>
            {/* <img src={img?.src} alt={'alt'} /> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
