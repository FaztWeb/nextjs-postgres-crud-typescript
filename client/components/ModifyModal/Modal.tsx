import modal from './modal.module.css';
import TypewriterComponent from 'typewriter-effect';
import finishType from 'lib/finishType';
import { useState, useEffect, useRef } from 'react';
import { debounceTime, tap } from 'rxjs';
import Field from './Field/Field';
import StatusIcon from './StatusIcon/StatusIcon';
import { IoIosClose } from 'react-icons/io';
import modal$, { showLoading } from 'lib/modal';
import Button from './Button/Button';
import Loading from 'components/Loading/Loading';
export const ids = ['info', 'name', 'descriptions'];

const Modal = () => {
  const [status, setStatus] = useState<{
    demo: boolean;
    descriptionField: boolean;
    infoField: boolean;
    nameField: boolean;
    pictures: boolean;
  }>({
    demo: false,
    descriptionField: false,
    infoField: false,
    nameField: false,
    pictures: false,
  });
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = finishType
      .pipe(
        debounceTime(700),
        tap((value) =>
          setStatus({
            ...status,
            demo: value,
          })
        )
      )
      .subscribe();
    const show$ = showLoading.subscribe(setLoading);
    return () => {
      obs.unsubscribe();
      show$.unsubscribe();
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
                    .callFunction(() => {
                      finishType.next(true);
                    })
                    .pauseFor(400)
                    .callFunction(() => {
                      finishType.next(false);
                    })
                    .deleteChars(16)
                    .typeString('schimbare . . . ')
                    .callFunction(() => {
                      finishType.next(true);
                    })
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
