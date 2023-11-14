import React, { useEffect, useState, useContext } from 'react';
import moviesApi from '../../utils/api/MoviesApi';
import { filterMovies, getNumOfCards } from '../../utils/utils';
import useLocalStorage from '../../utils/useLocalStorage';
import mainApi from '../../utils/api/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ showError, onDelete }) {
  const [screenSize, setScreenSize] = useState(getNumOfCards(window.innerWidth));
  const [movies, setMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const { isLoading, setIsLoading } = useContext(CurrentUserContext);
  const [filteredMovies, setFilteredMovies] = useLocalStorage('movies', []);
  const [isShortFilmChecked, setIsShortFilmChecked] = useLocalStorage('isShortFilmChecked', false);
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const [displayedMoviesCount, setDisplayedMoviesCount] = useState(screenSize.cards);
  const moviesToShow = filteredMovies.slice(0, displayedMoviesCount);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([moviesApi.getMovies(), mainApi.getAllMovies()])
      .then(([moviesData, savedMovies]) => {
        const moviesWithSavedFlag = moviesData.map((movie) => {
          const savedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
          return {
            ...movie,
            isSaved: Boolean(savedMovie),
            _id: savedMovie ? savedMovie._id : null,
          };
        });
        setMovies(moviesWithSavedFlag);
      })
      .catch((error) => {
        showError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDisplayedMoviesCount(screenSize.cards);
  }, [screenSize.cards]);

  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newSize = getNumOfCards(window.innerWidth);
        setScreenSize(newSize);
        setDisplayedMoviesCount(newSize.cards);
      }, 500);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const updatedMovies = filteredMovies.map((filteredMovie) => {
      const correspondingMovie = movies.find((movie) => movie.id === filteredMovie.id);
      if (correspondingMovie) {
        return {
          ...filteredMovie,
          isSaved: correspondingMovie.isSaved || false,
          _id: correspondingMovie._id || null,
        };
      } else {
        return filteredMovie;
      }
    });
    setFilteredMovies(updatedMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  const handleSaveButtonClick = (movie) => {
    mainApi
      .addMovie(movie)
      .then((addedMovie) => {
        setMovies((prevMovies) =>
          prevMovies.map((film) =>
            film.id === addedMovie.movieId
              ? {
                  ...film,
                  isSaved: true,
                  _id: addedMovie._id,
                }
              : film,
          ),
        );
      })
      .catch((error) => {
        showError(error);
      });
  };

  function handleDelete(movieId) {
    onDelete(movieId)
      .then(() => {
        setMovies((prev) =>
          prev.map((film) =>
            film._id === movieId
              ? {
                  ...film,
                  isSaved: false,
                  _id: null,
                }
              : film,
          ),
        );
      })
      .catch((error) => {
        showError(error);
      });
  }

  const handleFilter = (check) => {
    setNoResults(false);
    if (!searchQuery && filteredMovies.length === 0) return;
    const filtered = filterMovies(movies, searchQuery, check);
    return filtered.length > 0 ? setFilteredMovies(filtered) : setNoResults(true);
  };

  const handleShortFilmChange = (check) => {
    setIsShortFilmChecked(check);
    handleFilter(check);
  };

  const handleResetSearchState = () => {
    setFilteredMovies([]);
    setSearchError(false);
  };

  const handleSearch = () => {
    handleResetSearchState();
    if (!searchQuery) {
      setSearchError(true);
      return;
    }
    handleFilter(isShortFilmChecked);
  };

  const handleLoadMore = () => {
    const newDisplayedCount = displayedMoviesCount + screenSize.addCardsNumber;
    setDisplayedMoviesCount(newDisplayedCount);
  };

  return (
    <>
      <Header dark={true} />
      <main>
        <SearchForm
          onSearch={handleSearch}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          setIsShortFilmChecked={setIsShortFilmChecked}
        >
          <FilterCheckbox onCheckboxChange={handleShortFilmChange} isShortFilmChecked={isShortFilmChecked} />
        </SearchForm>
        <section className='movies' aria-label='Карточки фильмов'>
          <MoviesCardList
            movies={moviesToShow}
            searchError={searchError}
            noResults={noResults}
            isLoading={isLoading}
            onSave={handleSaveButtonClick}
            onDelete={handleDelete}
          />

          {filteredMovies.length > displayedMoviesCount && (
            <button className='button movies__button-more' onClick={handleLoadMore} aria-label='Подгрузить ещё фильмы'>
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
