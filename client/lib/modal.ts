import { Subject } from 'rxjs';

const modal = new Subject<boolean>();
export const showLoading = new Subject<boolean>();

export default modal;
