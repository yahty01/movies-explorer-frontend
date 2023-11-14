import './MoviesCard.scss';
import { useLocation } from 'react-router-dom';
import { MOVIES_API_URL } from '../../utils/constants';
import { convertMins } from '../../utils/utils';

function MoviesCard({ movie, onSave, onDelete }) {
  const location = useLocation();

  const handleSaveButtonClick = () => {
    if (movie.isSaved) {
      onDelete(movie._id);
    } else {
      onSave(movie);
    }
  };

  const handleDeleteButtonClick = () => onDelete(movie._id);

  const isSavedMoviesPage = location.pathname === '/saved-movies';
  return (
    <li className='movie-card'>
      <a href={`${movie.trailerLink}`} className='link' target='_blank' rel='noreferrer'>
        <img
          src={isSavedMoviesPage ? `${movie.image}` : `${MOVIES_API_URL}${movie.image.url}`}
          className='movie-card__image'
          alt={movie.nameRU}
        />{' '}
      </a>
      <div className='movie-card__info'>
        <h2 className='movie-card__title'>{movie.nameRU}</h2>
        {isSavedMoviesPage ? (
          <button
            type='button'
            className='button movie-card__delete-button'
            aria-label='Удалить карточку фильма'
            onClick={handleDeleteButtonClick}
          ></button>
        ) : (
          <button
            type='button'
            className={`button movie-card__save-button ${movie.isSaved ? 'movie-card__save-button_active' : ''}`}
            aria-label='Сохранить карточку фильма'
            onClick={handleSaveButtonClick}
          ></button>
        )}
        <p className='movie-card__duration'>{convertMins(movie.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
