import { useEffect, useRef, useState } from 'react';
import buttonStyle from './button.module.css';
import Tooltip from 'rc-tooltip';
import ActionPopup from 'components/ActionPopup/ActionPopup';
import triggers from 'lib/trigger';
import { mergeMap, tap, from, of, fromEvent, Observable, Subscription, switchMap, catchError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
const ids = ['info', 'name', 'descriptions'];
const data = ids.reduce<Record<string, string>>((obj, field) => {
  return { ...obj, [field]: '' }
}, {} as Record<string, string>)

const except = (v: unknown) => { throw v }

const Button = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const [changes, setChanges] = useState({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let click$: Subscription;
    if (buttonRef.current) click$ = fromEvent(buttonRef.current, 'click').pipe(
      mergeMap(() => fromFetch('/api', {
        selector: async r => r.ok ? ({ data: await r.json() } as const) : except(r)
      })),

      catchError(err => of({ error: true, message: err.toString() } as const))
    ).subscribe();
    const value$ = ids.map(id => triggers[id].subscribe((event) => {
      data[id] = event.payload;
    }));
    () => {
      click$.unsubscribe();
      value$.forEach(value => value.unsubscribe());
    }
  }, [])
  return (
    <Tooltip visible={visible} overlay={<ActionPopup />} placement="bottom">
      <button
        className={buttonStyle.button}
        ref={buttonRef}
      >
        Salvati Modificarile
      </button>
    </Tooltip >
  );
};

export default Button;
