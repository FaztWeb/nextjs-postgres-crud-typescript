import { churchToModify$, modal$ } from 'lib/modal';
import coordinates from 'lib/moveTo';
import type { Church } from 'components/Searchbox/SearchResults/SearchResults';

import cardStyle from './card.module.css';
import Carousel from 'components/Carousel/Carousel';
import { FaPen } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { BiChurch } from 'react-icons/bi';
const Card = ({ church }: { church: Church }) => {
  return (
    <div className={cardStyle.container}>
      <div className={cardStyle.header__container}>
        <button
          className={cardStyle.header__title}
          onClick={() => {
            coordinates.next([church.lat, church.long]);
          }}
        >
          <div className={cardStyle.content}>
            <div className={cardStyle.content__icon}>
              <BiChurch />
            </div>
            <div className={cardStyle.main__content}>{church.name}</div>
          </div>
        </button>
        <div className={cardStyle.content}>
          <div className={`${cardStyle.content__icon} ${cardStyle.pin__icon}`}>
            <HiLocationMarker />
          </div>
          <div className={cardStyle.main__content}>
            <div className={cardStyle.coordinates}>
              <div className={cardStyle.latLong}>{church.lat}</div>
              <div className={cardStyle.latLong}>{church.long}</div>
            </div>
          </div>
        </div>
        <div className={cardStyle.content}>
          <div className={`${cardStyle.content__icon} ${cardStyle.pin__icon}`}>
            <HiLocationMarker />
          </div>
          <div className={cardStyle.main__content}>
            <Carousel church={church.name} />
          </div>
        </div>
      </div>
      <div className={cardStyle.info__container}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius sed
        mollitia maxime. Fugit saepe unde debitis reiciendis sint similique
        aspernatur perferendis assumenda fuga quod deserunt nulla explicabo
        velit animi sit voluptate aliquam ea ex, eligendi beatae tenetur
        quaerat. Vitae nisi ratione ad, consequatur illum commodi!
      </div>
      <div className={cardStyle.suggest__container}>
        <button
          className={cardStyle.button}
          onClick={() => {
            churchToModify$.next(church.name);
            modal$.next(true);
          }}
        >
          <div className={cardStyle.text}>
            Sugereaza o <span className={cardStyle.span}>modificare</span>
          </div>
          <FaPen className={cardStyle.pen} />
        </button>
      </div>
    </div>
  );
};

export default Card;
