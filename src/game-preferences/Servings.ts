export const enum Servings {
  LAGER = 'LAGER',
  RED_ALE = 'RED_ALE',
  CIDER = 'CIDER'
}

export const isServings = (input: unknown): input is Servings =>
  Boolean(input) &&
  typeof input === 'string' &&
  (input === Servings.CIDER || input === Servings.LAGER || input === Servings.RED_ALE);
