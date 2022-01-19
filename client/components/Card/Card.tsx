import cardStyle from './card.module.css';
import { HiLocationMarker } from 'react-icons/hi';
import type { Church } from 'components/Searchbox/SearchResults/SearchResults';
import coordinates from 'lib/coordinates';
import Carousell from 'components/Carousell/Carousell';
import { FaPen } from 'react-icons/fa';
import modal from 'lib/modal';
const Card = ({ church }: { church: Church }) => {
  return (
    <div className={cardStyle.container}>
      <div className={cardStyle.header__container}>
        <div
          className={cardStyle.headerTitle}
          onClick={() => {
            coordinates.next([church.lat, church.long]);
          }}
        >
          {church.name}
        </div>
        <div className={cardStyle.headerSubtitle}>
          <div className={cardStyle.coordinates}>
            <HiLocationMarker className={cardStyle.icon} />
            <div className={cardStyle.latLong}>{church.lat}</div>
            <div className={cardStyle.latLong}>{church.long}</div>
          </div>
          <Carousell></Carousell>
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
        <div className={cardStyle.text} onClick={() => {
          modal.next(true);
        }}>Sugereaza o modificare</div>
        <FaPen className={cardStyle.pen} />
      </div>
    </div>
  );
};

export default Card;
