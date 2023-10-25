import './Promo.scss';
import PromoImage from '../../images/promo-image.svg';
import Container from '../Container/Container';

const Promo = () => {
  return (
    <section className="promo" aria-label="Блок о проекте">
      <Container>
        <div className="promo__content">
          <div className="promo__column">
            <h1 className="promo__heading">
              Учебный проект студента факультета <span className="promo__word">Веб-разработки</span>.
            </h1>
            <p className="promo__message">
              Листайте ниже, чтобы узнать больше про этот проект и его создателя.
            </p>
            <a className="button promo__button" href="#about-project" aria-label="Узнать подробную информацию о проекте">
              Узнать больше
            </a>
          </div>
          <div className="promo__column">
            <img className="promo__image" src={PromoImage} alt="Всемирная паутина" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Promo;