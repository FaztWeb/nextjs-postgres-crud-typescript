import { FC } from 'react';
import Button from '../Button';

const Dispatch: FC<{ payload: string; action: () => unknown }> = ({
  payload,
  action,
}) => {
  return <Button payload={payload} onClick={action} />;
};

export default Dispatch;
