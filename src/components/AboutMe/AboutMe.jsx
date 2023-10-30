import Container from '../Container/Container';
import Heading from '../Heading/Heading';
import './AboutMe.scss';
import PersonalPhoto from '../../images/personal-photo.jpg';

function AboutMe() {
  return (
    <section className='about-me' aria-label='Общая информация о студенте'>
      <Container>
        <Heading noMargin={true}>Студент</Heading>
        <div className='about-me__personal-container'>
          <div className='about-me__personal-info'>
            <h3 className='about-me__personal-name'>Егор</h3>
            <p className='about-me__personal-occupation'>Фронтенд-разработчик, 21 год</p>
            <blockquote className='about-me__personal-description'>
            Я из Москвы, учусь на факультете компьютерной безопасности. Веб-разработка оказалась истинной страстью для меня, внезапно охватившей всю мою жизнь. Я точно вижу себя в будущем как профессионального веб-разработчика, поскольку это то, что действительно заставляет меня просыпаться каждое утро с воодушевлением и с нетерпением ждать нового дня, полного кода.
            </blockquote>
            <a className='link about-me__personal-link' href='https://github.com/yahty01' target='_blank' rel='noreferrer' aria-label='Перейти на страницу студента в GitHub'>
              Github
            </a>
          </div>
          <img className='about-me__personal-photo' src={PersonalPhoto} alt='Моё фото' />
        </div>
      </Container>
    </section>
  );
}

export default AboutMe;