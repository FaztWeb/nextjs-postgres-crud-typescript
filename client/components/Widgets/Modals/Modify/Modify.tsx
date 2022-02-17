import { showLoading$, ids } from 'lib/modal';
import { useState, useEffect } from 'react';
import modal from './modal.module.css';
import TypewriterComponent from 'typewriter-effect';
import Field from './Field/Field';
import StatusIcon from './StatusIcon/StatusIcon';
import { write } from './typewriter';
import Button from '../../Button/Button';
import Loading from 'components/Loading/Loading';
import ImageSupplier from './ImageSupplier/ImageSupplier';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import ModalTemplate from '../Modals';
import { action } from 'store';
const Modal = () => {
  const dispatch = useAppDispatch();
  const { visible, zIndex } = useAppSelector(({ modifyModal }) => modifyModal);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(zIndex);
  }, [zIndex]);

  function closeModal() {
    dispatch(
      action('modify-modal/close', {
        zIndex: 0,
      })
    );
  }

  useEffect(() => {
    const subscription = showLoading$.subscribe(setLoading);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const typewriter = (
    <TypewriterComponent
      onInit={write}
      options={{
        autoStart: true,
        cursorClassName: `${modal.cursor}`,
      }}
    />
  );

  const fieldsToModify = (
    <div className={modal.main__content}>
      {ids.map((id) => {
        return (
          <Field key={id} id={id}>
            <StatusIcon id={id}></StatusIcon>
          </Field>
        );
      })}
      <ImageSupplier />
    </div>
  );

  return visible ? (
    <ModalTemplate
      zIndex={zIndex}
      closeCurrentModal={closeModal}
      header={{
        title: typewriter,
        subtitle:
          'Pentru a imbunatatii calitatea informatiilor sugerati o modificare',
      }}
    >
      {loading ? <Loading></Loading> : null}
      {fieldsToModify}
      <div className={modal.button__container}>
        <div className={modal.button__content}>
          <Button
            action={() => {
              console.log('AAAAAAAAAAAA');
            }}
            payload="Salvati Modificarile"
          ></Button>
        </div>
      </div>
    </ModalTemplate>
  ) : null;
};

export default Modal;
