const SHORT_MOVIE_DURATION = 40;
const HOUR_IN_MINUTES = 60;

// Функция фильтрует список фильмов по запросу и длительности
const filterMovies = (movies, query, shortOnly) => {
  const lowerCaseQuery = query.toLowerCase();

  return movies.filter(({ nameRU, nameEN, duration }) => 
    (nameRU.toLowerCase().includes(lowerCaseQuery) || 
    nameEN.toLowerCase().includes(lowerCaseQuery)) && 
    (!shortOnly || duration <= SHORT_MOVIE_DURATION)
  );
};

// Функция определяет количество карточек на основании ширины экрана
const getNumOfCards = (screenWidth) => {
  const breakpoints = [
    { cards: { initial: 16, additional: 4 }, minWidth: 1200 },
    { cards: { initial: 12, additional: 4 }, minWidth: 900 },
    { cards: { initial: 8, additional: 4 }, minWidth: 600 },
    { cards: { initial: 5, additional: 2 }, minWidth: 0 },
  ];
  
  const { cards } = breakpoints.find(({ minWidth }) => screenWidth >= minWidth);
  return cards;
};


// Функция преобразует минуты в формат часы-минуты
const formatDuration = (durationInMinutes) => {
  const hours = Math.floor(durationInMinutes / HOUR_IN_MINUTES);
  const minutes = durationInMinutes % HOUR_IN_MINUTES;

  return `${hours}ч ${minutes.toString().padStart(2, '0')}м`;
};

export { filterMovies, getNumOfCards, formatDuration };
