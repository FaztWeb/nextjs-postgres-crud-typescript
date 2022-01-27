import { trigger$ } from 'lib/modal';
import { ReactElement, useRef } from 'react';
import fieldStyle from './field.module.css';

const Field = ({ children, id }: { children: ReactElement; id: string }) => {
  const placeholderRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className={fieldStyle.container}>
      <div className={fieldStyle.terminal}>
        <div className={fieldStyle.nameAndStatus}>
          <div className={fieldStyle.name}>@user.anonim</div>
          <div className={fieldStyle.status}>{children}</div>
        </div>
        <div className={fieldStyle.input}>
          <div className={fieldStyle.fieldName}>descriere ~#</div>
          <div className={fieldStyle.fieldInput}>
            <textarea
              aria-describedby={id}
              ref={placeholderRef}
              className={fieldStyle.textarea}
              placeholder="Sugerati o descriere aici"
              onFocus={() => {
                trigger$[id].next({
                  payload: '',
                  showFor: 1000,
                });
              }}
              onKeyUp={(event) => {
                const placeholder =
                  placeholderRef.current as HTMLTextAreaElement;
                event.code === 'Backspace'
                  ? ((placeholder.style.height = 'auto'),
                    (placeholder.style.height = `${event.currentTarget.scrollHeight}px`))
                  : (placeholder.style.height = `${event.currentTarget.scrollHeight}px`);
                trigger$[id].next({
                  payload: event.currentTarget.value,
                  showFor: 1000,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className={fieldStyle.tip}></div>
    </div>
  );
};

export default Field;
