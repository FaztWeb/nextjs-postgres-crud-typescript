import iconStyle from './statusicon.module.css';
import { FaCheckCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import trigger from 'lib/trigger';
import { debounce, tap, map, timer } from 'rxjs';
import providedInfo from 'lib/providedInfo';

type styles = {
  backgroundColor: string;
  color: string;
  text: string;
};

const pendingStyles = {
  backgroundColor: 'grey',
  color: 'grey',
  text: 'Procesam schimbarile ...',
};

const processedChanges = {
  backgroundColor: 'green',
  color: 'green',
  text: 'Schimbarile au fost salvate !',
};
const StatusIcon = ({ id }: { id: string }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [status, setStatus] = useState<styles>();
  useEffect(() => {
    providedInfo.subscribe();
    const obj = trigger[id]
      .pipe(
        map((event) => {
          setVisible(true);
          setStatus(pendingStyles);
          return event;
        }),
        debounce((event) => timer(event.showFor as number)),
        tap((event) => {
          setStatus(processedChanges);
          return event;
        }),
        debounce((event) => timer(event.showFor)),
        tap(() => {
          setVisible(false);
        })
      )
      .subscribe();
    return () => {
      obj.unsubscribe();
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
          className={
            providedInfo
              ? `${iconStyle.icon} ${iconStyle.provided}`
              : iconStyle.icon
          }
          style={{ color: status?.color }}
        />
      </div>
    </Tooltip>
  );
};

export default StatusIcon;
