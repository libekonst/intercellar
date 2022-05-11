import { concat, EMPTY, interval, of, timer } from 'rxjs';
import {
  endWith,
  map,
  repeat,
  startWith,
  switchMap,
  switchMapTo,
  takeWhile
} from 'rxjs/operators';
import { getRandomInt } from '../utils/utils';

type Params = {
  countdownSeconds: number;
  durationSeconds: number;
  startAfterSeconds: number;
};

export const pubCrawl = (params: Params) => {
  const { countdownSeconds, durationSeconds, startAfterSeconds } = params;

  const countDownToPubCrawl$ = interval(1000).pipe(
    map((elapsed) => countdownSeconds - elapsed),
    takeWhile((remaining) => remaining >= 0),
    map((remaining) => <const>{ type: 'COUNTDOWN_REMAINING', value: remaining }),
    startWith(<const>{ type: 'COUNTDOWN_TIMER_STARTED' }),
    endWith(<const>{ type: 'COUNTDOWN_TIMER_ENDED' })
  );

  const pubCrawlDuration$ = interval(1000).pipe(
    map((elapsed) => durationSeconds - elapsed),
    takeWhile((remaining) => remaining >= 0),
    map((remaining) => <const>{ type: 'PUB_CRAWL_DURATION_REMAINING', value: remaining }),
    startWith(<const>{ type: 'PUB_CRAWL_STARTED' }),
    endWith(<const>{ type: 'PUB_CRAWL_ENDED' })
  );

  const pubCrawl$ = concat(countDownToPubCrawl$, pubCrawlDuration$);

  return timer(startAfterSeconds * 1000).pipe(switchMapTo(pubCrawl$));
};

export class PubCrawlClock {
  constructor() {} // readonly startAfterSeconds: number // readonly durationSeconds: number, // readonly countdownSeconds: number,

  private get countdownSeconds() {
    return 5;
  }
  private get startAfterMilliseconds() {
    return getRandomInt(3, 5);
  }
  private get durationSeconds() {
    return getRandomInt(3, 7);
  }

  private countdownUntilStart$ = interval(1000).pipe(
    map((elapsed) => this.countdownSeconds - elapsed),
    takeWhile((remaining) => remaining >= 0),
    map((remaining) => <const>{ type: 'COUNTDOWN_REMAINING', value: remaining }),
    startWith(<const>{ type: 'COUNTDOWN_TIMER_STARTED' }),
    endWith(<const>{ type: 'COUNTDOWN_TIMER_ENDED' })
  );

  private runningDuration$ = interval(1000).pipe(
    map((elapsed) => this.durationSeconds - elapsed),
    takeWhile((remaining) => remaining >= 0),
    map((remaining) => <const>{ type: 'PUB_CRAWL_DURATION_REMAINING', value: remaining }),
    startWith(<const>{ type: 'PUB_CRAWL_STARTED' }),
    endWith(<const>{ type: 'PUB_CRAWL_ENDED' })
  );

  private pubCrawl$ = concat(this.countdownUntilStart$, this.runningDuration$);

  readonly clock$ = timer(this.startAfterMilliseconds).pipe(switchMapTo(this.pubCrawl$));

  readonly clockz$ = of(EMPTY).pipe(
    switchMap(() => timer(this.startAfterMilliseconds).pipe(switchMapTo(this.pubCrawl$))),
    repeat()
  );

  subscribe = this.clockz$.subscribe;
}
