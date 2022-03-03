import { showLoading$ } from 'lib/modal';
import { useState, useEffect } from 'react';
import modal from './modal.module.css';
import TypewriterComponent from 'typewriter-effect';
import Field from './Field/Field';
import StatusIcon from './StatusIcon/StatusIcon';
import { write } from './typewriter';
import Loading from 'components/Loading/Loading';
import ModalTemplate from '../Modals';
import { indexOf } from 'store/widgets/widgets-actions';
import { selectFrom } from 'store/widgets/actions/modals-actions';
const Modal = () => {
  const { name, visible } = selectFrom<{ name: string }>('modify-modal');
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

  return visible ? (
    <ModalTemplate
      modalToClose="modify-modal"
      header={{
        title: typewriter,
        subtitle:
          'Pentru a imbunatatii calitatea informatiilor sugerati o modificare',
      }}
    >
      {loading ? <Loading></Loading> : null}
      <Field name={name} id="description">
        <StatusIcon id="description"></StatusIcon>
      </Field>
      <div className={modal.button__container}>
        <div className={modal.button__content}></div>
      </div>
    </ModalTemplate>
  ) : null;
};

export default Modal;
