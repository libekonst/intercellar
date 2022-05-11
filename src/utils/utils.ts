import { nanoid } from 'nanoid';

export const id = () => nanoid(10);

export const getRandomPosition = () => {
  const x = document.body.offsetHeight - 100;
  const y = document.body.offsetWidth - 100;
  const randomX = Math.floor(Math.random() * x);
  const randomY = Math.floor(Math.random() * y);

  return { top: randomX, left: randomY };
};

export const getScreenCenterPosition = () => ({
  top: window.innerHeight / 2,
  left: window.innerWidth / 2
});

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export const getRandomInt = (min: number, max: number) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};
