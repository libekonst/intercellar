import React, { useEffect, useMemo } from 'react';
import { timer } from 'rxjs';
import { mapTo, switchMap, take } from 'rxjs/operators';
import { getRandomInt } from '../utils/utils';
import {
  LowDamageStrategy,
  SteadyLowDamageStrategy,
  MediumDamageStrategy,
  HardDamageStrategy,
  PubCrawlDamageStrategy
} from './damager/damage-strategies';
import { Damager } from './damager/Damager';
import { Difficulty } from './Difficulty';
import { pubCrawl, PubCrawlClock } from './pubCrawl';

type Props = {
  onDamageInflicted: (damage: number) => void;
  gameRunning?: boolean;
  children: React.ReactNode;
  difficulty: Difficulty;
  onChangeDifficulty: (difficulty: Difficulty) => void;
  setCountdown: (remainingSeconds: number) => void;
};

export function ProgressDamage(props: Props) {
  const { gameRunning, onDamageInflicted, difficulty, children, setCountdown } = props;

  const damager = useMemo(() => new Damager(new LowDamageStrategy()), []);

  useEffect(() => {
    damager.changeStrategy(mapDifficultyToDamageStrategy(difficulty));
  }, [damager, difficulty]);

  useEffect(() => {
    if (!gameRunning) return;
    const sub = damager.progressDamage$.subscribe(onDamageInflicted);

    return () => sub.unsubscribe();
  }, [damager.progressDamage$, gameRunning, onDamageInflicted]);

  // useEffect(() => {
  //   if (difficulty !== Difficulty.HARD || !gameRunning) return;
  //   const sub = timer(5000).subscribe(() => onChangeDifficulty(Difficulty.PUB_CRAWL));
  //   return () => sub.unsubscribe();
  // }, [difficulty, gameRunning, onChangeDifficulty]);

  // useEffect(() => {
  //   if (difficulty !== Difficulty.PUB_CRAWL || !gameRunning) return;
  //   const sub = timer(5000).subscribe(() => onChangeDifficulty(Difficulty.HARD));
  //   return () => sub.unsubscribe();
  // }, [difficulty, gameRunning, onChangeDifficulty]);

  useEffect(() => {
    if (!gameRunning) return;
    if (difficulty !== Difficulty.HARD) return;

    const sub = new PubCrawlClock().subscribe((message) => {
      console.log(message);
      if (message.type === 'PUB_CRAWL_STARTED')
        damager.changeStrategy(new PubCrawlDamageStrategy());
      if (message.type === 'PUB_CRAWL_ENDED')
        damager.changeStrategy(new HardDamageStrategy());
      if (message.type === 'COUNTDOWN_REMAINING') setCountdown(message.value);
    });

    return () => sub.unsubscribe();
  }, [damager, difficulty, gameRunning, setCountdown]);

  return <>{children}</>;
}

const mapDifficultyToDamageStrategy = (difficulty: Difficulty) => {
  if (difficulty === Difficulty.BEGINNER) return new SteadyLowDamageStrategy();
  if (difficulty === Difficulty.EASY) return new LowDamageStrategy();
  if (difficulty === Difficulty.NORMAL) return new MediumDamageStrategy();
  if (difficulty === Difficulty.HARD) return new HardDamageStrategy();
  else return new LowDamageStrategy();
};
