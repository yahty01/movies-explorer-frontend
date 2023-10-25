import Container from '../Container/Container';
import './Portfolio.scss';

const projects = [
  {
    title: 'Статичный сайт',
    link: 'https://yahty01.github.io/how-to-learn/',
    label: 'Перейти на статичный сайт',
  },
  {
    title: 'Адаптивный сайт',
    link: 'https://yahty01.github.io/russian-travel/',
    label: 'Перейти на адаптивный сайт',
  },
  {
    title: 'Одностраничное приложение',
    link: 'https://yahty.nomoredomainsrocks.ru/sign-in',
    label: 'Перейти на одностраничное приложение',
  },
];

const Portfolio = () => {
  return (
    <section className='portfolio' aria-label='Список некоторых проектов, выполненных за время обучения'>
      <Container>
        <h2 className='portfolio__heading'>Портфолио</h2>
        <ul className='portfolio__list'>
          {projects.map((project, index) => (
            <li key={index} className='portfolio__list-item'>
              <a className='link portfolio__site-link' href={project.link} target='_blank' rel='noreferrer' aria-label={project.label}>
                {project.title}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Portfolio;