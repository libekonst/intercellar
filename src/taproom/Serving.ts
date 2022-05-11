import { id } from '../utils/utils';
import { Servings } from '../game-preferences/Servings';

export type Serving = { serving: Servings; id: string };
export const mapServingToEmoji = (serving: Servings) => {
  switch (serving) {
    default:
    case Servings.LAGER:
      return '🍺';
    case Servings.RED_ALE:
      return '🍷';
    case Servings.DOUBLE_BEER:
      return '🍻';
    case Servings.CIDER:
      return '🍎';
  }
};

export const createServing = (serving: Servings): Serving => ({
  serving: serving,
  id: id()
});
