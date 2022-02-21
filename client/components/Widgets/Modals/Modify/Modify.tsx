import { showLoading$, ids } from 'lib/modal';
import { useState, useEffect } from 'react';
import modal from './modal.module.css';
import TypewriterComponent from 'typewriter-effect';
import Field from './Field/Field';
import StatusIcon from './StatusIcon/StatusIcon';
import { write } from './typewriter';
import Loading from 'components/Loading/Loading';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import ModalTemplate from '../Modals';
import { indexOf } from 'store';
const Modal = () => {
  const visible = useAppSelector(({ modifyModal }) => modifyModal);
  const zIndex = indexOf('modify-modal');

  const [loading, setLoading] = useState(false);

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
    </div>
  );

  return visible ? (
    <ModalTemplate
      zIndex={zIndex}
      modalToClose="modify-modal"
      header={{
        title: typewriter,
        subtitle:
          'Pentru a imbunatatii calitatea informatiilor sugerati o modificare',
      }}
    >
      {loading ? <Loading></Loading> : null}
      {fieldsToModify}
      <div className={modal.button__container}>
        <div className={modal.button__content}></div>
      </div>
    </ModalTemplate>
  ) : null;
};

export default Modal;
