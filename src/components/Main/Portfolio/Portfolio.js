import React from 'react';
// import { Link as a } from 'react-router-dom';
import './Portfolio.css'
import cursor from '../../../images/text__COLOR_font-main.svg'

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">
        Портфолио
      </h3>
        <ul className="portfolio__container">
          <li className="portfolio__element">
            <a className="portfolio__link" 
              href="https://github.com/DimaOlix/how-to-learn" 
              rel="noopener noreferrer" 
              target="_blank">
              Статичный сайт
              <img className="portfolio__cursor" src={ cursor } alt="стрелка" />
            </a>
          </li>
          <li className="portfolio__element portfolio__element_position_center">
            <a 
              className="portfolio__link" 
              href="https://github.com/DimaOlix/russian-travel"
              rel="noopener noreferrer"
              target="_blank">
              Адаптивный сайт
              <img className="portfolio__cursor" src={ cursor } alt="стрелка" />
            </a>
          </li>
          <li className="portfolio__element">
            <a 
              className="portfolio__link" 
              href="https://github.com/DimaOlix/react-mesto-api-full"
              rel="noopener noreferrer"
              target="_blank">
              Одностраничное приложение
              <img className="portfolio__cursor" src={ cursor } alt="стрелка" />
            </a>
          </li>
        </ul>
    </section>
  )
};

export default Portfolio;