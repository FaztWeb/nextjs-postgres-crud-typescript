import carousellStyle from './carousell.module.css';
import astronaut from './assets/astronaut.png';
import celebrating from './assets/celebrating.png';
import education from './assets/education.png';
import taken from './assets/taken.png';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import carouselStyle from './carousell.module.css';

/**
 * TO DO:
 * Set the scroll to change with the width change of the images
 */
const scroll = 200;
const images = [astronaut, celebrating, education, taken];

const Carousell = () => {
  const [position, setPosition] = useState<number>(0);
  useEffect(() => {
    console.log((position % images.length) * scroll * -1);
  }, [position]);
  return (
    <div className={carousellStyle.container}>
      <div
        className={carousellStyle.scroller}
        style={{
          transform: `translateX(${
            (position % images.length) * scroll * -1
          }px)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className={carouselStyle.image__container}>
            <img src={image.src} />
          </div>
        ))}
      </div>
      <div className={carouselStyle.icons}>
        <FaArrowLeft
          className={carouselStyle.left}
          onClick={() => {
            setPosition(position - 1);
          }}
        />
        <FaArrowRight
          className={carouselStyle.right}
          onClick={() => {
            setPosition(position + 1);
          }}
        />
      </div>
    </div>
  );
};

export default Carousell;
