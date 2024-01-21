// В этом файле мы импортируем константы и функции из configUtils и используем их в наших утилитах
import {SIZE_MAP, SHORT_MOVIE_DURATION, convertMins } from "./configUtils";

const filterMovies = (movies, query, shortOnly) => {
  const lowerCaseQuery = query.toLowerCase();
  return movies.filter(({ nameRU, nameEN, duration }) => 
    (nameRU.toLowerCase().includes(lowerCaseQuery) || 
     nameEN.toLowerCase().includes(lowerCaseQuery)) && 
    (!shortOnly || duration <= SHORT_MOVIE_DURATION)
  );
};

const findScreenSize = (screenWidth) => {
  if (screenWidth >= 1200) {
    return SIZE_MAP.xl;
  } else if (screenWidth >= 900) {
    return SIZE_MAP.lg;
  } else if (screenWidth >= 600) {
    return SIZE_MAP.md;
  } else {
    return SIZE_MAP.sm;
  }
};

export { filterMovies, findScreenSize, convertMins };
