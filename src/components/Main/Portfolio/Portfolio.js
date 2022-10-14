import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css'
import cursor from '../../../images/text__COLOR_font-main.svg'

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>
        Портфолио
      </h3>
        <ul className='portfolio__container'>
          <li className='portfolio__element'>
            <Link className='portfolio__link' src='#'>
              Статичный сайт
              <img className='portfolio__cursor' src={ cursor } alt='стрелка' />
            </Link>
          </li>
          <li className='portfolio__element portfolio__element_position_center'>
            <Link className='portfolio__link' src='#'>
              Адаптивный сайт
              <img className='portfolio__cursor' src={ cursor } alt='стрелка' />
            </Link>
          </li>
          <li className='portfolio__element'>
            <Link className='portfolio__link' src='#'>
              Одностраничное приложение
              <img className='portfolio__cursor' src={ cursor } alt='стрелка' />
            </Link>
          </li>
        </ul>
    </section>
  )
};

export default Portfolio;