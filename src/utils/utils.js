import { SCREEN_SIZE_MAP, SHORT_FILM_DURATION } from './constants';

const updateFilteredMovies = (movies, query, checked) => {
  const lowerCaseQuery = query.toLowerCase();
  return movies.filter(
    (movie) => 
      (movie.nameRU.toLowerCase().includes(lowerCaseQuery) ||
       movie.nameEN.toLowerCase().includes(lowerCaseQuery)) &&
      (!checked || movie.duration <= SHORT_FILM_DURATION)
  );
};

const findScreenSize = (screenWidth) => {
  const sizes = [
    { size: SCREEN_SIZE_MAP.xl, minWidth: 1200 },
    { size: SCREEN_SIZE_MAP.lg, minWidth: 900 },
    { size: SCREEN_SIZE_MAP.md, minWidth: 600 },
    { size: SCREEN_SIZE_MAP.sm, minWidth: 0 },
  ];
  return sizes.find(({ minWidth }) => screenWidth >= minWidth).size;
};

const convertDuration = (number) => {
  const hours = Math.floor(number / 60);
  const minutes = number % 60;
  return `${hours}ч ${minutes.toString().padStart(2, '0')}м`;
};

export { updateFilteredMovies, findScreenSize, convertDuration };
