import { useState } from 'react';
import buttonStyle from './button.module.css';
import Tooltip from 'rc-tooltip';
import ActionPopup from 'components/ActionPopup/ActionPopup';

const Button = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  return (
    <Tooltip visible={visible} overlay={<ActionPopup />} placement="bottom">
      <button
        className={buttonStyle.button}
        onClick={() => {
          new Promise((resolve) => {
            setTimeout(resolve, 1000);
          }).then(() => {
            setIsVisible(true);
          });
        }}
      >
        Salvati Modificarile
      </button>
    </Tooltip>
  );
};

export default Button;
