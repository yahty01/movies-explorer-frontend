export const SHORT_MOVIE_DURATION = 40;

export const HOUR_IN_MINUTES = 60;

export const convertMins = (mins) => {
  const h = Math.trunc(mins / HOUR_IN_MINUTES);
  const min = mins % HOUR_IN_MINUTES;
  return `${h}ч ${min.toString().padStart(2, '0')}м`;
};

