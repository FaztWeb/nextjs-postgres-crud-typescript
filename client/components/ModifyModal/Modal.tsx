import modal from './modal.module.css';
import TypewriterComponent from 'typewriter-effect';
import finishType from 'lib/finishType';
import { useState, useEffect, useRef } from 'react';
import { debounceTime, tap } from 'rxjs';
import Field from './Field/Field';
import StatusIcon from './StatusIcon/StatusIcon';

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
    return () => {
      obs.unsubscribe();
    };
  }, []);
  return (
    <>
      <div ref={containerRef} className={modal.container}>
        <div className={modal.header}>
          <div className={modal.title}>
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
          </div>
        </div>
        <div className={modal.main__content}>
          <Field id="firstField">
            <StatusIcon id="firstField"></StatusIcon>
          </Field>
          <Field id="secondField">
            <StatusIcon id="secondField"></StatusIcon>
          </Field>
          <Field id="thirdField">
            <StatusIcon id="thirdField"></StatusIcon>
          </Field>
        </div>
      </div>

      <div className={modal.tooltip__container}></div>
    </>
  );
};

export default Modal;
