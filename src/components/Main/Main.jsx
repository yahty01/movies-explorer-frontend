// Импорт компонентов шапки и подвала
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// Импорт основных компонентов страницы
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

//основное содержимое главной страницы
function Main() {
  return (
    <>
      <Header />
      <main className='main'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;