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
    popupProps.subscribe(setPopup);
    popupRef.current
      ? setWidthHeight([
          popupRef?.current?.offsetHeight,
          popupRef?.current?.offsetWidth,
        ])
      : 0;
  }, [popupRef?.current?.offsetHeight, popupRef?.current?.offsetWidth]);
  return (
    <div
      ref={popupRef}
      className={popupStyle.container}
      style={{
        top: `${y - height - 10}px`,
        left: `${x - 10}px`,
        visibility: `${visibility}`,
      }}
    >
      {message}
    </div>
  );
};

export default Popup;
