import { Subject } from 'rxjs';

const ids = ['info', 'name', 'descriptions'];

const changes = new Subject<boolean>();

export default showPopup;
