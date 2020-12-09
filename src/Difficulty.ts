import { getRandomInt } from "./utils";

export enum Difficulty {
  BEGINNER,
  EASY,
  NORMAL,
  HARD,
}

type Timer = {
  interval: () => number;
  damage: () => number;
};

/** Small amount of customers, larger intervals. */
const easy = (): Timer => ({
  interval: () => getRandomInt(2, 4) * 1000,
  damage: () => getRandomInt(1, 2),
});

/**
 * Average intervals, heavy punch of damage(amount of customers).
 * Impactful damage but gives time to react. Smooth animation.
 */
const normal = (): Timer => ({
  interval: () => getRandomInt(1, 3) * 750,
  damage: () => getRandomInt(5, 9),
});

/**
 * Very small intervals, small ticks of damage.
 * Continuous burn, user must start aggressively and not rest.
 * Might hurt animation.
 */
const hard = (): Timer => ({
  interval: () => getRandomInt(1, 3) * 250,
  damage: () => getRandomInt(1, 7),
});

/**
 * Returns a `Timer` based on input difficulty.
 * Don't use a `Timer` for Difficulty.BEGINNER .
 */
export const createTimers = (difficulty: Difficulty): Timer => {
  if (difficulty === Difficulty.EASY) return easy();
  if (difficulty === Difficulty.NORMAL) return normal();
  if (difficulty === Difficulty.HARD) return hard();

  return easy();
};
