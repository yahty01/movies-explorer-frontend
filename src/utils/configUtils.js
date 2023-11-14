// Здесь мы определяем breakpoints и другие константы, которые могут быть использованы в разных частях приложения
export const breakpoints = [
  { cards: { initial: 16, additional: 4 }, minWidth: 1200 },
  { cards: { initial: 12, additional: 4 }, minWidth: 900 },
  { cards: { initial: 8, additional: 4 }, minWidth: 600 },
  { cards: { initial: 5, additional: 2 }, minWidth: 0 },
];

export const SHORT_MOVIE_DURATION = 40;

export const HOUR_IN_MINUTES = 60;

export const convertMins = (mins) => {
  const h = Math.trunc(mins / HOUR_IN_MINUTES);
  const min = mins % HOUR_IN_MINUTES;
  return `${h}ч ${min.toString().padStart(2, '0')}м`;
};

