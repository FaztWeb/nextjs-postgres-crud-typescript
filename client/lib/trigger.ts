import { Subject } from 'rxjs';

export type iconStatus = {
  field: string;
  payload: string;
  showFor: number;
  color: string;
  backgroundColor: string;
};

const trigger = new Subject<iconStatus>();

export default trigger;
