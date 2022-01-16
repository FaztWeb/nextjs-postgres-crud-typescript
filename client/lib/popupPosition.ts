import { Subject } from 'rxjs';

const popupProps = new Subject<
  [number, number, string, 'hidden' | 'visible']
>();

export default popupProps;
