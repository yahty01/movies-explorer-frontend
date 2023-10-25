import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import Footer from '../Footer/Footer';
import filmData from '../../MovieData/movieData-saved.json';

function SavedMovies() {
  return (
    <>
      <Header mode={'dark'} />{' '}
      <main className='saved-movies'>
        <SearchForm />
        <MoviesCardList movieData={filmData} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
