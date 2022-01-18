import trigger from 'lib/trigger';
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
                trigger[id].next({
                  field: id,
                  payload: 'Procesam schimbarile',
                  showFor: 1000,
                  backgroundColor: 'gray',
                  color: 'gray',
                });
              }}
              onKeyDown={() => {
                trigger[id].next({
                  field: id,
                  payload: 'Procesam schimbarile',
                  showFor: 1000,
                  backgroundColor: 'gray',
                  color: 'gray',
                });
              }}
              onKeyUp={(event) => {
                const placeholder =
                  placeholderRef.current as HTMLTextAreaElement;
                event.code === 'Backspace'
                  ? ((placeholder.style.height = 'auto'),
                    (placeholder.style.height = `${event.currentTarget.scrollHeight}px`))
                  : (placeholder.style.height = `${event.currentTarget.scrollHeight}px`);
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
