import { providedInfo$, trigger$ } from 'lib/modal';
import { debounce, tap, map, timer } from 'rxjs';
import { useEffect, useState } from 'react';

import iconStyle from './statusicon.module.css';
import { FaCheckCircle } from 'react-icons/fa';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

type styles = {
  backgroundColor: string;
  color: string;
  text: string;
};

const pendingStyles = {
  backgroundColor: 'rgb(214, 181, 71)',
  color: 'rgb(214, 181, 71)',
  text: 'Procesam schimbarile ...',
};

const errorStyle = {
  backgroundColor: 'grey',
  color: 'grey',
  text: 'Nicio schimbare nu a fost detectata',
};

const processStyles = {
  backgroundColor: 'green',
  color: 'green',
  text: 'Schimbarile au fost inregistrate !',
};
const StatusIcon = ({ id }: { id: string }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [status, setStatus] = useState<styles>();
  useEffect(() => {
    providedInfo$.subscribe();
    const subscriber = trigger$[id]
      .pipe(
        map((event) => {
          setVisible(true);
          setStatus(pendingStyles);
          return event;
        }),
        debounce((event) => timer(event.showFor as number)),
        tap((event) => {
          event.payload !== ''
            ? setStatus(processStyles)
            : setStatus(errorStyle);
          return event;
        }),
        debounce((event) => timer(event.showFor)),
        tap(() => {
          setVisible(false);
        })
      )
      .subscribe();
    return () => {
      subscriber.unsubscribe();
    };
  }, []);
  return (
    <Tooltip
      id={id}
      overlayClassName={iconStyle.tooltip}
      placement="top"
      visible={visible}
      overlay={
        <div
          className={iconStyle.tooltip}
          style={{
            backgroundColor: status?.backgroundColor,
          }}
        >
          <p>{status?.text}</p>
        </div>
      }
    >
      <div>
        <FaCheckCircle
          className={iconStyle.icon}
          style={{ color: status?.color }}
        />
      </div>
    </Tooltip>
  );
};

export default StatusIcon;
