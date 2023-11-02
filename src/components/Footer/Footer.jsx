import './Footer.scss';

function Footer() {
  const date = new Date();
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <p className='footer__message'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__bottom-line'>
          <div className='footer__timestamp'>&copy; {date.getFullYear()}</div>
          <div className='footer__links'>
            <a
              className='link footer__link'
              href='https://practicum.yandex.ru'
              target='_blank'
              rel='noreferrer'
              aria-label='Перейти на официальный сайт Яндекс Практикума'
            >
              Яндекс.Практикум
            </a>
            <a
              className='link footer__link'
              href='https://github.com/yahty01'
              target='_blank'
              rel='noreferrer'
              aria-label='Перейти в GitHub'
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
