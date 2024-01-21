import React, { useEffect, useState, useContext } from "react";
import moviesApi from "../../utils/api/MoviesApi";
import { filterMovies, findScreenSize } from "../../utils/utils";
import useLocalStorage from "../../hooks/useLocalStorage";
import mainApi from "../../utils/api/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies({ showError, onDelete }) {
  const [screenSize, setScreenSize] = useState(
    findScreenSize(window.innerWidth)
  );
  const [movies, setMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const { isLoading, setIsLoading } = useContext(CurrentUserContext);
  const [filteredMovies, setFilteredMovies] = useLocalStorage("movies", []);
  const [isShortFilmChecked, setIsShortFilmChecked] = useLocalStorage(
    "isShortFilmChecked",
    false
  );
  const [searchQuery, setSearchQuery] = useLocalStorage("searchQuery", "");
  const [displayedMoviesCount, setDisplayedMoviesCount] = useState(
    screenSize.cards
  );
  const moviesToShow = filteredMovies.slice(0, displayedMoviesCount);

useEffect(() => {
    async function fetchMoviesData() {
      try {
        setIsLoading(true);
        const [allMovies, userSavedMovies] = await Promise.all([
          moviesApi.getMovies(),
          mainApi.getAllMovies()
        ]);
  
        const updatedMovies = allMovies.map(movie => {
          const matchingSavedMovie = userSavedMovies.find(saved => saved.movieId === movie.id);
          return {
            ...movie,
            isSaved: !!matchingSavedMovie,
            _id: matchingSavedMovie ? matchingSavedMovie._id : null,
          };
        });
  
        setMovies(updatedMovies);
      } catch (error) {
        showError(error);
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchMoviesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function updateDisplayedMoviesCount() {
      const cardCount = screenSize.cards;
      setDisplayedMoviesCount(cardCount);
    }
  
    updateDisplayedMoviesCount();
  }, [screenSize.cards]); // Зависимость: количество карточек в зависимости от размера экрана
  

  useEffect(() => {
    let resizeTimer;
    const RESIZE_DELAY = 500;
  
    function updateSize() {
      const newSize = findScreenSize(window.innerWidth);
      setScreenSize(newSize);
      setDisplayedMoviesCount(newSize.cards);
    }
  
    function onWindowResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateSize, RESIZE_DELAY);
    }
  
    window.addEventListener('resize', onWindowResize);
    
    // Очистка подписки на событие
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);  

  useEffect(() => {
    function updateMoviesWithSavedStatus() {
      const moviesWithSavedStatus = filteredMovies.map(currentMovie => {
        const matchedMovieInAll = movies.find(movie => movie.id === currentMovie.id);
        return matchedMovieInAll 
          ? {
              ...currentMovie,
              isSaved: matchedMovieInAll.isSaved || false,
              _id: matchedMovieInAll._id || null,
            }
          : currentMovie;
      });
  
      setFilteredMovies(moviesWithSavedStatus);
    }
  
    updateMoviesWithSavedStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]); // Зависимость от общего списка фильмов  

  const handleSaveMovie = async (movieToSave) => {
    try {
      const addedMovie = await mainApi.addMovie(movieToSave);

      const updateMoviesList = (prevMovies) =>
        prevMovies.map((existingMovie) =>
          existingMovie.id === addedMovie.movieId
            ? { ...existingMovie, isSaved: true, _id: addedMovie._id }
            : existingMovie
        );

      setMovies(updateMoviesList);
    } catch (error) {
      showError(error);
    }
  };

  async function handleMovieDeletion(movieIdToDelete) {
    try {
      await onDelete(movieIdToDelete);

      const updateMoviesList = (previousMovies) =>
        previousMovies.map((existingMovie) =>
          existingMovie._id === movieIdToDelete
            ? { ...existingMovie, isSaved: false, _id: null }
            : existingMovie
        );

      setMovies(updateMoviesList);
    } catch (error) {
      showError(error);
    }
  }

  const handleFilter = (isShortFilmChecked) => {
    setNoResults(false);

    if (!searchQuery && filteredMovies.length === 0) {
      return;
    }

    const applyFilter = () => {
      const filteredResult = filterMovies(
        movies,
        searchQuery,
        isShortFilmChecked
      );
      if (filteredResult.length > 0) {
        setFilteredMovies(filteredResult);
      } else {
        setNoResults(true);
      }
    };

    applyFilter();
  };

  const handleShortFilmChange = (newCheckValue) => {
    setIsShortFilmChecked(newCheckValue);
    handleFilter(newCheckValue);
  };

  const resetSearchResults = () => {
    // Очистка результатов поиска и сброс состояния ошибки
    setFilteredMovies([]);
    setSearchError(false);
  };

  const performSearch = () => {
    // Сброс текущего состояния поиска перед выполнением нового запроса
    resetSearchResults();

    if (!searchQuery) {
      setSearchError(true);
      return;
    }

    // Вызов функции фильтрации результатов поиска
    handleFilter(isShortFilmChecked);
  };

  const increaseDisplayedMovies = () => {
    // Увеличение количества отображаемых фильмов на основе текущего размера экрана
    const updatedMovieDisplayCount =
      displayedMoviesCount + screenSize.addCardsNumber;
    setDisplayedMoviesCount(updatedMovieDisplayCount);
  };

  return (
    <>
      <Header dark={true} />
      <main>
        <SearchForm
          onSearch={performSearch}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          setIsShortFilmChecked={setIsShortFilmChecked}
        >
          <FilterCheckbox onCheckboxChange={handleShortFilmChange} isShortFilmChecked={isShortFilmChecked} />
        </SearchForm>
        <section className="movies" aria-label="Карточки фильмов">
          <MoviesCardList
            movies={moviesToShow}
            searchError={searchError}
            noResults={noResults}
            isLoading={isLoading}
            onSave={handleSaveMovie}
            onDelete={handleMovieDeletion}
          />

          {filteredMovies.length > displayedMoviesCount && (
            // Условный рендеринг кнопки "Ещё"
            <button
              className="button movies__button-more"
              onClick={increaseDisplayedMovies}
              aria-label="Подгрузить ещё фильмы"
            >
              Ещё
            </button>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
