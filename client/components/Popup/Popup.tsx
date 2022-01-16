import { useEffect, useRef, useState } from 'react';
import popupStyle from './popup.module.css';
import popupProps from 'lib/popupPosition';
import { debounceTime, tap, throttleTime } from 'rxjs';
const Popup = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [[x, y, message, visibility], setPopup] = useState<
    [number, number, string, 'hidden' | 'visible']
  >([0, 0, '', 'hidden']);
  const [[height, width], setWidthHeight] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    console.log('RERENDER');
    if (popupRef.current)
      popupProps
        .pipe(
          tap((payload) => {
            setPopup(payload);
          }),
          tap(() =>
            setWidthHeight([
              popupRef?.current?.offsetHeight as number,
              popupRef?.current?.offsetWidth as number,
            ])
          )
        )
        .subscribe();
  }, [popupRef]);

  return (
    <div
      ref={popupRef}
      className={popupStyle.container}
      style={{
        padding: width && height ? '10px' : '0px',
        top: width && height ? `${y - height - 10}px` : '0px',
        left: width && height ? `${x - 10}px` : '0px',
        visibility: width && height ? `${visibility}` : 'hidden',
      }}
    >
      {message}
    </div>
  );
};

export default Popup;
