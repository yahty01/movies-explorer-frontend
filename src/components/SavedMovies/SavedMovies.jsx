import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// Импорт API для работы с фильмами
import mainApi from '../../utils/MainApi';
// Утилиты для работы с фильтрацией фильмов
import { filterMovies } from '../../utils/utils';
// Импорты компонентов
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.scss';

function SavedMovies({ onDelete, showError }) {
  // Состояния для фильмов, фильтров и поискового запроса
  const [savedMovies, setSavedMovies] = useState([]);
  const { isLoading, setIsLoading } = useContext(CurrentUserContext);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [searchError, setSearchError] = useState(false);

  // Обработчик удаления фильма
  const handleDelete = (movieId) => {
    onDelete(movieId)
      .then(() => {
        // Обновление списка фильмов после удаления
        setSavedMovies((prev) => prev.filter((movie) => movie._id !== movieId));
        setFilteredMovies((prev) => prev.filter((movie) => movie._id !== movieId));
      })
      .catch((error) => {
        showError(error);
      });
  };

  // Загрузка сохраненных фильмов при монтировании компонента
  useEffect(() => {
    setIsLoading(true);
    mainApi
      .getAllMovies()
      .then((movies) => {
        setSavedMovies(movies);
        setFilteredMovies(movies);
      })
      .catch((error) => {
        showError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // Отключение линтера для предотвращения добавления зависимостей
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Функция фильтрации фильмов
  const handleFilter = (check) => {
    setNoResults(false);
    if (!searchQuery && filteredMovies.length === 0) return;
    const filtered = filterMovies(savedMovies, searchQuery, check);
    return filtered.length > 0 ? setFilteredMovies(filtered) : setNoResults(true);
  };

  // Обработчик изменения фильтра короткометражных фильмов
  const handleShortFilmChange = (check) => {
    setIsShortFilmChecked(check);
    handleFilter(check);
  };

  // Сброс состояний поиска
  const handleResetSearchState = () => {
    setFilteredMovies([]);
    setSearchError(false);
  };

  // Обработчик поиска фильмов
  const handleSearch = () => {
    handleResetSearchState();
    if (!searchQuery) {
      setSearchError(true);
      return;
    }
    handleFilter(isShortFilmChecked, searchQuery);
  };

  // Отрисовка компонента
  return (
    <>
      <Header dark={true} />
      <main className='saved-movies'>
        {/* Форма поиска и фильтрации фильмов */}
        <SearchForm
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          setIsShortFilmChecked={setIsShortFilmChecked}
        >
          <FilterCheckbox onCheckboxChange={handleShortFilmChange} isShortFilmChecked={isShortFilmChecked} />
        </SearchForm>
        <section className='movies' aria-label='Карточки фильмов'>
          {/* Список карточек фильмов с возможностью удаления */}
          <MoviesCardList
            movies={filteredMovies}
            isLoading={isLoading}
            onDelete={handleDelete}
            searchError={searchError}
            noResults={noResults}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
