import { trigger$ } from 'lib/modal';
import { FC, useRef, useEffect } from 'react';
import fieldStyle from './field.module.css';
import { useGetChurchInfoQuery } from 'lib/church-info-fetcher';
import { processUserInput } from 'components/Widgets/Modals/Modify/Field/info-slice';
import { useAppDispatch } from 'hooks/redux-hooks';

const Field: FC<{
  id: string;
  name: string;
}> = ({ children, id, name }) => {
  const { currentData } = useGetChurchInfoQuery(name);
  console.log(name);

  const dispatch = useAppDispatch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textareaRef.current
      ? (textareaRef.current.value =
          currentData?.churchInfo?.churchDescription || '')
      : null;
    textareaRef.current?.click();
  }, []);

  return (
    <div className={fieldStyle.container}>
      <div className={fieldStyle.terminal}>
        <div className={fieldStyle.name__status}>
          <div className={fieldStyle.name}>@user.anonim</div>
          <div className={fieldStyle.status}>{children}</div>
        </div>
        <div className={fieldStyle.input}>
          <div className={fieldStyle.fieldName}>descriere ~#</div>
          <div className={fieldStyle.fieldInput}>
            <textarea
              aria-describedby={id}
              ref={textareaRef}
              className={fieldStyle.textarea}
              onClick={(event) => {
                textareaRef.current
                  ? (textareaRef.current.style.height = `${event.currentTarget.scrollHeight}px`)
                  : null;
              }}
              onKeyUp={(event) => {
                const placeholder = textareaRef.current as HTMLTextAreaElement;
                event.code === 'Backspace'
                  ? ((placeholder.style.height = 'auto'),
                    (placeholder.style.height = `${event.currentTarget.scrollHeight}px`))
                  : (placeholder.style.height = `${event.currentTarget.scrollHeight}px`);
                dispatch(
                  processUserInput({
                    info: event.currentTarget.value,
                    churchName: name,
                  })
                );
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
