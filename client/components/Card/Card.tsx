import { churchToModify$, modal$ } from 'lib/modal';
import coordinates from 'lib/moveTo';
import type { Church } from 'components/Searchbox/SearchResults/SearchResults';

import cardStyle from './card.module.css';
import Carousel from 'components/Carousel/Carousel';
import { FaPen } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';

const Card = ({ church }: { church: Church }) => {
  return (
    <div className={cardStyle.container}>
      <div className={cardStyle.header__container}>
        <button
          className={cardStyle.headerTitle}
          onClick={() => {
            coordinates.next([church.lat, church.long]);
          }}
        >
          {church.name}
        </button>
        <div className={cardStyle.headerSubtitle}>
          <div className={cardStyle.coordinates}>
            <HiLocationMarker className={cardStyle.icon} />
            <div className={cardStyle.latLong}>{church.lat}</div>
            <div className={cardStyle.latLong}>{church.long}</div>
          </div>
          <Carousel></Carousel>
          <div className={cardStyle.short_description}>
            Biserica Catolica / Ortodoxa
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
