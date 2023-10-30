import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.scss';

function MoviesCardList({ movieData }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const location = useLocation();
  const isOnMoviesPage = location.pathname === '/movies';

  return (
    <section className='movies' aria-label='Карточки фильмов'>
      <div className='movies__container'>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <ul className='movies__list'>
              {movieData.map((movie) => (
                <MoviesCard key={movie.id} movie={movie} />
              ))}
            </ul>
            {isOnMoviesPage && (
              <button className='button movies__button-more' aria-label='Ещё фильмы'>
                Ещё
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;