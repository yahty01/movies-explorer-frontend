import Container from '../Container/Container';
import Heading from '../Heading/Heading';
import './Techs.scss';

const technologies = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];

const Techs = () => {
  return (
    <section className='techs' aria-label='Изученные за время обучения технологии'>
      <Container>
        <Heading>Технологии</Heading>
        <h3 className='techs__title'>7 технологий</h3>
        <p className='techs__message'>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className='techs__list'>
          {technologies.map((tech, index) => (
            <li key={index} className='techs__list-item'>{tech}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Techs;