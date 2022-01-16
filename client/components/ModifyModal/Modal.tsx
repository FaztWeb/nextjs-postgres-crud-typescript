import modal from './modal.module.css';
import TypewriterComponent from 'typewriter-effect';
import finishType from 'lib/finishType';
import { useState, useEffect, useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { debounceTime, tap } from 'rxjs';
import ReactTooltip from 'react-tooltip';

const Modal = () => {
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = finishType
      .pipe(
        debounceTime(700),
        tap((value) => setHasFinished(value))
      )
      .subscribe();
    return () => {
      obs.unsubscribe();
    };
  }, []);
  return (
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
        <div
          data-tip="Schimbarea a fost inregistrata"
          className={hasFinished ? `${modal.icon} ${modal.finish}` : modal.icon}
        >
          <FaCheckCircle className={modal.iconDiv} />
        </div>
        <ReactTooltip
          effect="solid"
          className={
            hasFinished
              ? `${modal.tooltip} ${modal.finishedToolTip}`
              : `${modal.tooltip} ${modal.pending}`
          }
        />
      </div>
    </div>
  );
};

export default Modal;
