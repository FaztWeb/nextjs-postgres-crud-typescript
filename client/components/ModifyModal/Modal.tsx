import { modal$, showLoading$, ids } from 'lib/modal';
import { useState, useEffect, useRef } from 'react';

import modal from './modal.module.css';
import TypewriterComponent from 'typewriter-effect';
import Field from './Field/Field';
import StatusIcon from './StatusIcon/StatusIcon';
import { IoIosClose } from 'react-icons/io';
import Button from './Button/Button';
import Loading from 'components/Loading/Loading';
import ImageSupplier from './ImageSupplier/ImageSupplier';

const Modal = () => {
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const show = showLoading$.subscribe(setLoading);
    return () => {
      console.log('UNMOUTED');
      show.unsubscribe();
    };
  }, []);
  return (
    <>
      <div ref={containerRef} className={modal.container}>
        {loading ? <Loading></Loading> : null}
        <div className={modal.header}>
          <div className={modal.title}>
            <div className={modal.typewtitter}>
              <TypewriterComponent
                onInit={(typewriter) => {
                  typewriter
                    .typeString('Sugerati o modificare . . .')
                    .pauseFor(400)
                    .deleteChars(16)
                    .typeString('schimbare . . . ')
                    .start();
                }}
                options={{
                  autoStart: true,
                  cursorClassName: `${modal.cursor}`,
                }}
              />
              <div
                className={modal.close}
                onClick={() => {
                  modal$.next(false);
                }}
              >
                <IoIosClose className={modal.closeIcon} />
              </div>
            </div>
            <div className={modal.subcontainer}>
              Pentru a imbunatatii calitatea informatiilor si a datelor
              prezentate
            </div>
          </div>
        </div>
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
        <div className={modal.button__container}>
          <div className={modal.button__content}>
            <Button></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
