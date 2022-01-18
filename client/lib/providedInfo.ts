import { Subject } from 'rxjs';

export type providedField = {
  field: string;
  hasProvided: boolean;
};
const providedInfo = new Subject<providedField>();

export default providedInfo;
