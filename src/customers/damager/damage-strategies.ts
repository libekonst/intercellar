import { getRandomInt } from '../../utils/utils';

export interface DamageStrategy {
  damageDelaySeconds: () => number;
  damage: () => number;
}

export class SteadyLowDamageStrategy implements DamageStrategy {
  damageDelaySeconds = () => 2000;
  damage = () => 1;
}
export class LowDamageStrategy implements DamageStrategy {
  damageDelaySeconds = () => getRandomInt(2, 4) * 1000;
  damage = () => getRandomInt(1, 2);
}
export class MediumDamageStrategy implements DamageStrategy {
  damageDelaySeconds = () => getRandomInt(1, 3) * 750;
  damage = () => getRandomInt(5, 9);
}
export class HardDamageStrategy implements DamageStrategy {
  damageDelaySeconds = () => getRandomInt(1, 3) * 250;
  damage = () => getRandomInt(1, 7);
}
export class PubCrawlDamageStrategy implements DamageStrategy {
  damageDelaySeconds = () => getRandomInt(1, 3) * 100;
  damage = () => getRandomInt(1, 3);
}
