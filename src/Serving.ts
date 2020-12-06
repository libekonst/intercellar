import { id } from "./utils";

export type Serving = { serving: ServingTypes; id: string };
export enum ServingTypes {
  LAGER,
  RED_ALE,
  DOUBLE_BEER,
}

export const mapServingToEmoji = (serving: ServingTypes) => {
  switch (serving) {
    default:
    case ServingTypes.LAGER:
      return "🍺";
    case ServingTypes.RED_ALE:
      return "🍷";
    case ServingTypes.DOUBLE_BEER:
      return "🍻";
  }
};

export const createServing = (serving: ServingTypes): Serving => ({
  serving: serving,
  id: id(),
});
