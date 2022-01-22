import { Subject } from 'rxjs';

const modal = new Subject<boolean>();
const showLoading = new Subject<boolean>();

export default modal;
