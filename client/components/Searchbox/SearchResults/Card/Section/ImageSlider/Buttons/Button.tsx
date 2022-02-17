import ClickOverlay from 'components/ClickOverlay/ClickOverlay';
import { FC } from 'react';
import button_style from './button.module.css';

interface ButtonShape {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
}

const Button: FC<ButtonShape> = ({ text, icon, onClick }) => {
  return (
    <div className={button_style.outer__container} onClick={onClick}>
      <ClickOverlay
        sideEffects={() => {
          return;
        }}
      >
        <div className={button_style.inner__container}>
          <div className={button_style.button_text}>{text}</div>
          <div className={button_style.button_icon}>{icon}</div>
        </div>
      </ClickOverlay>
    </div>
  );
};

export default Button;
