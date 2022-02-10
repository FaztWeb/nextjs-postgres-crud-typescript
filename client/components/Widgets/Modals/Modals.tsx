import { FC } from 'react';
import modal__style from './modal.module.css';
import { IoIosClose } from 'react-icons/io';

interface ModalComponents {
  actions: {
    dispatch: () => void;
  };
  header: {
    title: JSX.Element | string;
    subtitle: JSX.Element | string;
  };
}
const ModalTemplate: FC<ModalComponents> = ({ children, actions, header }) => {
  // name the classes better
  return (
    <div className={modal__style.modal__container}>
      <div className={modal__style.container}>
        <div className={modal__style.navigation}>
          <div className={modal__style.header}>
            <div className={modal__style.header__container}>
              <div className={modal__style.title}>{header.title}</div>
            </div>
            <div className={modal__style.close}>
              <IoIosClose
                className={modal__style.closeIcon}
                onClick={actions.dispatch}
              />
            </div>
          </div>
          <div className={modal__style.subtitle}>{header.subtitle}</div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalTemplate;
