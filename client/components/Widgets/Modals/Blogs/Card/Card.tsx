import card__styles from './card.module.css';
import { AiOutlineHeart } from 'react-icons/ai';
import { FC } from 'react';
import { FaCrown } from 'react-icons/fa';
const Card: FC<{
  golden?: boolean;
}> = ({ golden = false }) => {
  const Award = (
    <>
      {golden ? (
        <div className={card__styles.award}>Cel mai apreciat articol</div>
      ) : null}
      {golden ? (
        <div className={card__styles.crown__container}>
          <FaCrown className={card__styles.crown} />
        </div>
      ) : null}
    </>
  );
  return (
    <div className={card__styles.golden_distinction}>
      {Award}
      <div className={card__styles.container}>
        <div className={card__styles.author__info}>
          <div className={card__styles.icon}></div>
          Alt Nume de Utilizator
        </div>
        <div className={card__styles.title}>
          Un titlu foarte lung care contine inofrmatii reprezentative pentru
          articol
        </div>
        <div className={card__styles.subtitle}>Subtitlul pentru articol</div>
        <div className={card__styles.more__info}>
          <div className={card__styles.info__text}>23 Feb</div>
          <div className={card__styles.info__text}>
            23 <AiOutlineHeart className={card__styles.like_button} />
          </div>
          <div className={card__styles.subtitle}>Categorie</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
