import './MoviesCard.scss';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie }) {
  const location = useLocation();
  const { image, name, duration, isSaved } = movie;
  const convertDuration = (number) => {
    const hours = Math.floor(number / 60);
    const minutes = number % 60;
    return `${hours}ч ${minutes}м`;
  };
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const saveButtonClass = `button movie-card__save-button ${isSaved ? 'active' : ''}`;

  return (
    <li className='movie-card'>
      <img src={image} className='movie-card__image' alt={name} />
      <div className='movie-card__info'>
        <h2 className='movie-card__info__title'>{name}</h2>
        {isSavedMoviesPage ? (
          <button type='button' className='button movie-card__delete-button' aria-label='Удалить карточку фильма'></button>
        ) : (
          <button type='button' className={saveButtonClass} aria-label='Сохранить карточку фильма'></button>
        )}
        <p className='movie-card__duration'>{convertDuration(duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;