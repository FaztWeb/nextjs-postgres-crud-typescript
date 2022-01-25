import { Subject } from 'rxjs';

export const ids = ['info', 'name', 'description'];

export type iconStatus = {
  payload: string;
  showFor: number;
};

const changes = ids.reduce<Record<string, Subject<iconStatus>>>(
  (previousValue: Record<string, Subject<iconStatus>>, currentValue) => {
    previousValue[currentValue] = new Subject<iconStatus>();
    return previousValue;
  },
  {} as Record<string, Subject<iconStatus>>
);

export default changes;
