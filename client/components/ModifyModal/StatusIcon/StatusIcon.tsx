import iconStyle from './statusicon.module.css';
import { FaCheckCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import trigger, { iconStatus } from 'lib/trigger';
import { debounce, tap, map, timer } from 'rxjs';
import providedInfo from 'lib/providedInfo';
const StatusIcon = ({ id }: { id: string }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [status, setStatus] = useState<iconStatus>();
  useEffect(() => {
    providedInfo.subscribe();
    const obj = trigger
      .pipe(
        map((event) => {
          setVisible(event.field === id);
          setStatus(event);
          return event;
        }),
        debounce((event) => timer(event.showFor as number)),
        tap((event) => {
          setStatus({
            ...event,
            backgroundColor: 'rgba(43, 165, 27, 0.76)',
            color: 'rgb(77, 206, 83)',
            payload: 'Schimbarile au fost salvate',
          });
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
          style={
            status?.field === id
              ? { backgroundColor: status.backgroundColor }
              : {}
          }
        >
          <p>{status?.payload}</p>
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
          style={status?.field === id ? { color: status.color } : {}}
        />
      </div>
    </Tooltip>
  );
};

export default StatusIcon;
