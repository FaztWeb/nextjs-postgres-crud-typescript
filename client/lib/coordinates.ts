import { Subject } from 'rxjs';

const coordinates = new Subject<[number, number]>();

export default coordinates;
