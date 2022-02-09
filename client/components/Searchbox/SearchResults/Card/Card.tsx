import type { Church } from 'components/Searchbox/SearchResults/SearchResults';
import Title from './Section/Title/Title';
import cardStyle from './card.module.css';
import ImageSlider from './Section/ImageSlider/ImageSlider';
import Position from './Section/Position/Position';
import MoreInfo from './Section/MoreInfo/MoreInfo';

const Card = ({ church }: { church: Church }) => {
  return (
    <div className={cardStyle.panel}>
      <div className={cardStyle.content__container}>
        <Title name={church.name}></Title>
        <Position x={church.lat} y={church.long} />
        <ImageSlider name={church.name} />
        <MoreInfo name={church.name} />
      </div>
    </div>
    // Name={cardStyle.suggest__container}>
    //         <button
    //           className={cardStyle.button}
    //           onClick={() => {
    //             churchToModify$.next(church.name);
    //             modal$.next(true);
    //           }}
    //         >
    //           <div className={cardStyle.text}>
    //             Sugereaza o <span className={cardStyle.span}>modificare</span>
    //           </div>
    //           <FaPen className={cardStyle.pen} />
    //         </button>
    //       </div> */
  );
};

export default Card;
