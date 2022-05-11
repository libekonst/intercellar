import { getRandomInt } from '../utils/utils';
import { Difficulty } from '../customers/Difficulty';

type TickerT = {
  tickAfter: () => number;
  damage: () => number;
};

/** Small amount of customers, larger intervals. */
const easyTicker = (): TickerT => ({
  tickAfter: () => getRandomInt(2, 4) * 1000,
  damage: () => getRandomInt(1, 2)
});

/**
 * Average intervals, heavy punch of damage(amount of customers).
 * Impactful damage but gives time to react. Smooth animation.
 */
const normalTicker = (): TickerT => ({
  tickAfter: () => getRandomInt(1, 3) * 750,
  damage: () => getRandomInt(5, 9)
});

/**
 * Very small intervals, small ticks of damage.
 * Continuous burn, user must start aggressively and not rest.
 * Might hurt animation.
 */
const hardTicker = (): TickerT => ({
  tickAfter: () => getRandomInt(1, 3) * 250,
  damage: () => getRandomInt(1, 7)
});

/**
 * Returns a `Timer` based on input difficulty.
 * Don't use a `Timer` for Difficulty.BEGINNER .
 */
export const createTicker = (difficulty: Difficulty): TickerT => {
  if (difficulty === Difficulty.EASY) return easyTicker();
  if (difficulty === Difficulty.NORMAL) return normalTicker();
  if (difficulty === Difficulty.HARD) return hardTicker();

  return easyTicker();
};

// -- State Pattern
class EasyTicker implements TickerT {
  tickAfter = () => getRandomInt(2, 4) * 1000;
  damage = () => getRandomInt(1, 2);
}
class MediumTicker implements TickerT {
  tickAfter = () => getRandomInt(1, 3) * 750;
  damage = () => getRandomInt(5, 9);
}
class HardTicker implements TickerT {
  tickAfter = () => getRandomInt(1, 3) * 250;
  damage = () => getRandomInt(1, 7);
}

export class Ticker {
  private ticker: TickerT;

  constructor(private readonly difficulty: Difficulty) {
    this.ticker = this.mapDifficultyToTicker(difficulty);
  }

  tickAfter = () => this.ticker.tickAfter();
  damage = () => this.ticker.damage();

  changeDifficulty = (difficulty: Difficulty) => {
    this.ticker = this.mapDifficultyToTicker(difficulty);
  };

  mapDifficultyToTicker(difficulty: Difficulty) {
    if (difficulty === Difficulty.EASY) return new EasyTicker();
    if (difficulty === Difficulty.NORMAL) return new MediumTicker();
    if (difficulty === Difficulty.HARD) return new HardTicker();
    return new EasyTicker();
  }
}
