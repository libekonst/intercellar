/**
 * Augments enhance you, allowing you to progress further into hard mode. May have up to 2 active at once.
 */
export enum Augments {
  /** FAST HANDS: Learn how to change a depleted cask much faster. */
  FASTER_RELOAD_TIME,

  /** EXTRA CASK: Use one additional cask that will be destroyed when depleted. */
  START_WITH_EXTRA_CASK,

  /** ULTRA BIG CASKS: Your casks can now produce more servings before they need to be changed. */
  REDUCE_CASK_DEPLETION_RATE,

  /** DOUBLE TAP: For some time after the game starts, produce two servings at once. */
  PRODUCE_TWO_SERVINGS,

  /**
   * PREMONITION: When you are overrun by customers, produce some servings you prepared earlier without consuming from your active cask.
   * Triggers even while changing a cask. Only once per game.
   */
  FREE_SERVINGS_WHEN_FALLING_BEHIND
}
