// Импорт компонентов
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

// Импорт данных и стилей
import movieData from '../../MovieData/movieData.json';


function Movies() {
  return (   
    <>
      <Header mode='dark' />

      <main>
        <SearchForm />
        <MoviesCardList movieData={movieData} />
      </main>

      <Footer />
    </>
  );
}

export default Movies;