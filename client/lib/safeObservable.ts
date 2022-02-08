import { pipe, Subject, takeUntil } from 'rxjs';
import { UnaryFunction } from 'rxjs';

export const securePipe = (...functions: UnaryFunction<any, any>[]) => {
  const stop$ = new Subject<boolean>();
  console.log(functions);
  const fns = [...functions, takeUntil(stop$)];
  const piper = fns.reduce((fn, piped) => pipe(fn, piped));
  return { piper, stop: stop$ };
};
