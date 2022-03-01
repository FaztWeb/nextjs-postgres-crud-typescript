import { trigger$ } from 'lib/modal';
import { FC, useRef, useEffect } from 'react';
import fieldStyle from './field.module.css';
import { useGetChurchInfoQuery } from 'lib/church-info-fetcher';
import { processUserInput } from 'lib/redux-observables/info-slice';
import { useAppDispatch } from 'hooks/redux-hooks';

const Field: FC<{
  id: string;
  name: string;
}> = ({ children, id, name }) => {
  const { currentData } = useGetChurchInfoQuery(
    'Biserica Catolica din Elisabetin'
  );
  useEffect(() => {
    console.log(currentData);
  }, [currentData]);
  const dispatch = useAppDispatch();
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
              onKeyUp={(event) => {
                const placeholder =
                  placeholderRef.current as HTMLTextAreaElement;
                event.code === 'Backspace'
                  ? ((placeholder.style.height = 'auto'),
                    (placeholder.style.height = `${event.currentTarget.scrollHeight}px`))
                  : (placeholder.style.height = `${event.currentTarget.scrollHeight}px`);
                dispatch(processUserInput(event.currentTarget.value));
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
