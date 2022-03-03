import { FC } from 'react';
import modal__style from './modal.module.css';
import { IoIosClose } from 'react-icons/io';
import { closeModal } from 'store/widgets/actions/modals-actions';
import type { supportedModals } from 'store/widgets/widgets-available';
import Loading from 'components/Loading/Loading';
import { indexOf } from 'store/widgets/widgets-actions';
interface ModalComponents {
  modalToClose: supportedModals;
  header: {
    title: JSX.Element | string;
    subtitle: JSX.Element | string;
  };
  loading: boolean;
}
const ModalTemplate: FC<ModalComponents> = ({
  children,
  modalToClose,
  header,
  loading,
}) => {
  const zIndex = indexOf(modalToClose);
  return loading ? (
    <Loading></Loading>
  ) : (
    <div
      className={modal__style.modal__container}
      style={{
        zIndex,
      }}
    >
      <div className={modal__style.container}>
        <div className={modal__style.navigation}>
          <div className={modal__style.header}>
            <div className={modal__style.header__container}>
              <div className={modal__style.title}>{header.title}</div>
            </div>
            <div className={modal__style.close}>
              <IoIosClose
                className={modal__style.closeIcon}
                onClick={() => {
                  closeModal(modalToClose);
                }}
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
