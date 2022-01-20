import { useEffect, useState } from 'react';
import buttonStyle from './button.module.css';
import Tooltip from 'rc-tooltip';
import ActionPopup from 'components/ActionPopup/ActionPopup';

const Button = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const [changes, setChanges] = useState({});

  useEffect(() => {
    setChanges();
  }, [])
  return (
    <Tooltip visible={visible} overlay={<ActionPopup />} placement="bottom">
      <button
        className={buttonStyle.button}
        onClick={() => {
          fetch('/api', {
            body: 
          }).then((e) => {
              console.log(e);
            });
        }}
      >
        Salvati Modificarile
      </button>
    </Tooltip>
  );
};

export default Button;
