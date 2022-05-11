import { EMPTY, Observable, of, timer } from 'rxjs';
import { mapTo, repeat, switchMap } from 'rxjs/operators';

type IntervalTicker = <T>(params: {
  afterMs: () => number;
  emitValue: () => T;
}) => Observable<T>;

/**
 * Creates an observable that emits `T` after a delay.
 * The emitted value is determined by `tickValue()` before each emission.
 * Each emission is scheduled independently and the delay is calculated ad-hoc by `afterMs()`, allowing it to change dynamically between emissions.
 *
 * Map empty obs to timer, which emits after `dueTime()` and completes, then restart empty obs.
 */
export const createDynamicIntervalEmitter: IntervalTicker = ({ afterMs, emitValue }) =>
  of(EMPTY).pipe(
    switchMap(() => timer(afterMs()).pipe(mapTo(emitValue()))),
    repeat()
  );
