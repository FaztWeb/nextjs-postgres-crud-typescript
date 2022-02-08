import { debounceTime, fromEvent, Subscription, tap } from 'rxjs';
import { FC, useEffect, useRef, useState } from 'react';
import click_style from './clickoverlay.module.css';
import { securePipe } from 'lib/safeObservable';
import { modal$ } from 'lib/modal';

const ClickOverlay: FC = ({ children }) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [overlays, setOverlays] = useState<JSX.Element[]>([]);
  useEffect(() => {
    let subscription: Subscription | undefined;
    const { piper, stop } = securePipe(
      debounceTime(2000),
      tap(() => {
        setOverlays([]);
      })
    );
    if (buttonRef.current)
      subscription = fromEvent(buttonRef.current, 'click')
        .pipe(piper)
        .subscribe();
    return () => {
      stop.next(true);
      subscription ? subscription.unsubscribe() : 0;
    };
  }, []);

  const overlayTemplate = <div className={`${click_style.click}`}></div>;

  return (
    <div
      onClick={() => {
        modal$.next(true);
      }}
      ref={buttonRef}
      className={`${click_style.main__container}`}
      onMouseDown={() => {
        setOverlays([...overlays, overlayTemplate]);
      }}
      tabIndex={0}
    >
      {overlays.map((overlay) => overlay)}
      {children}
    </div>
  );
};

export default ClickOverlay;
