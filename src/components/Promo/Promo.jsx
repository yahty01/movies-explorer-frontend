import Container from '../Container/Container';

import PromoImage from '../../images/promo-image.svg';

import './Promo.scss';

function Promo() {
  const handleLinkClick = (e) => {
    e.preventDefault();
    document.querySelector(e.target.hash).scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className='promo' aria-label='Промо блок о проекте'>
      <Container>
        <div className='promo__content'>
          <div className='promo__column'>
            <h1 className='promo__heading'>
              Учебный&nbsp;проект студента факультета <span className='promo__word'>Веб-разработки</span>.
            </h1>
            <p className='promo__message'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <a
              className='button promo__button'
              onClick={handleLinkClick}
              aria-label='Узнать подробную информацию о проекте'
              href='#about-project'
            >
              Узнать больше
            </a>
          </div>
          <div className='promo__column'>
            <img className='promo__image' src={PromoImage} alt='Интернет Паутина' />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Promo;
