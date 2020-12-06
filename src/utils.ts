import { nanoid } from "nanoid";


export const id = () => nanoid(10)

export const getRandomPosition = () => {
  const x = document.body.offsetHeight - 100;
  const y = document.body.offsetWidth - 100;
  const randomX = Math.floor(Math.random() * x);
  const randomY = Math.floor(Math.random() * y);

  return { top: randomX, left: randomY };
}

export const getScreenCenterPosition = () => {
  return {
    top: window.innerHeight / 2,
    left: window.innerWidth / 2,
  };
}
