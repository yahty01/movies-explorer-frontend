// В этом файле мы импортируем константы и функции из configUtils и используем их в наших утилитах
import { breakpoints, SHORT_MOVIE_DURATION, convertMins } from "./configUtils";

const filterMovies = (movies, query, shortOnly) => {
  const lowerCaseQuery = query.toLowerCase();
  return movies.filter(({ nameRU, nameEN, duration }) => 
    (nameRU.toLowerCase().includes(lowerCaseQuery) || 
     nameEN.toLowerCase().includes(lowerCaseQuery)) && 
    (!shortOnly || duration <= SHORT_MOVIE_DURATION)
  );
};

const getNumOfCards = (screenWidth) => {
  const { cards } = breakpoints.find(({ minWidth }) => screenWidth >= minWidth);
  return cards.initial;
};

export { filterMovies, getNumOfCards, convertMins };
