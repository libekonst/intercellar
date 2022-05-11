import React from 'react';
import { useGameManager } from '../game-manager/GameManager';

export function AmmoView() {
  const {} = useGameManager();

  const remainingServings = 10;
  const reloading = false;

  if (reloading) return <p>Changing cask</p>;
  if (remainingServings > 5) return null;
  return remainingServings; // map -> div OR split into 5 segments, representing cask availability
}
