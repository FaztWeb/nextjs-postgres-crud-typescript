import Slider, { LazyLoadTypes } from 'react-slick';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import carouselStyles from './carousel.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import Loading from 'components/Loading/Loading';

const Carousel = ({ church }: { church: string }) => {
  const [photos, setPhotos] = useState<HTMLImageElement[]>([]);
  // const { doAction, loading } = useLoading<string, HTMLImageElement[]>(
  //   async function () {
  //     const response = await fetch(`/api/images/${church}`);
  //     const base64Images = (await response.json()) as string[];
  //     if (!base64Images.error)
  //       return base64Images.map((base64Image) => {
  //         const image = new Image();
  //         image.src = 'data:image/png;base64,' + base64Image;
  //         return image;
  //       });
  //     else return [];
  //   }
  // );

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch(`/api/images/${church}`);
      const base64Images = (await response.json()) as string[];
      if (!base64Images.error)
        return base64Images.map((base64Image) => {
          const image = new Image();
          image.src = 'data:image/png;base64,' + base64Image;
          return image;
        });
      else return [];
    }

    fetchImages().then((images) => setPhotos(images));
  }, []);
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

  // useEffect(() => {
  //   doAction(church).then((images) => {
  //     setPhotos(images);
  //   });
  // }, []);

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
    centerMode: false,
    centerPadding: '0',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className={carouselStyles.container}>
      {true ? (
        <Slider {...settings}>
          {photos.map((img, index) => (
            <div key={index} className={carouselStyles.slide}>
              <img src={img?.src} alt={'alt'} />
            </div>
          ))}
        </Slider>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Carousel;
