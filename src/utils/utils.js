// В этом файле мы импортируем константы и функции из configUtils и используем их в наших утилитах
import { SHORT_MOVIE_DURATION, convertMins } from "./configUtils";

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
    return { cards: 16, addCardsNumber: 4 };
  } else if (screenWidth >= 900) {
    return { cards: 12, addCardsNumber: 3 };
  } else if (screenWidth >= 600) {
    return { cards: 8, addCardsNumber: 4 };
  } else {
    return { cards: 5, addCardsNumber: 2 };
  }
};

export { filterMovies, findScreenSize, convertMins };
