import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.scss';

function MoviesCardList({ movies, searchError, isLoading, noResults, onSave, onDelete }) {

  const renderLoading = () => isLoading && <Preloader />;
  const renderSearchError = () => searchError && <p className='movies__search-error'>Нужно ввести ключевое слово</p>;
  const renderNoResults = () => noResults && !searchError && <p className='movies__not-found'>Ничего не найдено </p>;

  const MoviesListDisplay = () => {
    if (!isLoading && !searchError && !noResults) {
      return (
        <ul className='movies__list'>
          {movies.map((movie) => (
            <MoviesCard 
              key={movie.id || movie.movieId} 
              movie={movie} 
              onSave={onSave} 
              onDelete={onDelete} 
            />
          ))}
        </ul>
      );
    }
    return null;
  };
  

  return (
    <div className='movies__container'>
      {renderLoading()}
      {renderSearchError()}
      {renderNoResults()}
      {MoviesListDisplay()}
    </div>
  );
}

export default MoviesCardList;
