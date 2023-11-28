import './AboutProject.scss';
import Container from '../Container/Container';
import Heading from '../Heading/Heading';

// Компонент для текстового блока
const TextBlock = ({ title, message }) => (
  <div className="about-project__text-block">
    <h3 className="about-project__text-heading">{title}</h3>
    <p className="about-project__text-message">{message}</p>
  </div>
);

const AboutProject = () => {
  return (
    <section className="about-project" id="about-project">
      <Container>
        <Heading level={2}>О проекте</Heading>

        <div className="about-project__text-container">
          {/* Текстовые блоки */}
          <TextBlock 
            title="Дипломный проект включал 5 этапов" 
            message="Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки."
          />
          <TextBlock 
            title="На выполнение диплома ушло 5 недель" 
            message="У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься."
          />
        </div>

        {/* Временная шкала */}
        <ul className="about-project__timeline">
          <li className="about-project__timeline-one">1 неделя</li>
          <li className="about-project__timeline-four">4 недели</li>
          <li className="about-project__timeline-one-caption">Back-end</li>
          <li className="about-project__timeline-four-caption">Front-end</li>
        </ul>
      </Container>
    </section>
  );
};

export default AboutProject;