import { DamageStrategy } from './damage-strategies';
import { createDynamicIntervalEmitter } from './createDynamicIntervalEmitter';

export class Damager {
  constructor(private strategy: DamageStrategy) {}

  changeStrategy(strategy: DamageStrategy) {
    this.strategy = strategy;
  }

  progressDamage$ = createDynamicIntervalEmitter({
    afterMs: () => this.strategy.damageDelaySeconds(),
    emitValue: () => this.strategy.damage()
  });
}
