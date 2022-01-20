import { Subject } from 'rxjs';

const ids = ['info', 'name', 'descriptions', 'button'];

export type iconStatus = {
  field: string;
  payload: string;
  showFor: number;
  color: string;
  backgroundColor: string;
};

const triggers = ids.reduce<Record<string, Subject<iconStatus>>>(
  (previousValue: Record<string, Subject<iconStatus>>, currentValue) => {
    previousValue[currentValue] = new Subject<iconStatus>();
    return previousValue;
  },
  {} as Record<string, Subject<iconStatus>>
);

export default triggers;
