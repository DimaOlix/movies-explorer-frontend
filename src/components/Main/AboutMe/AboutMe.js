import React from 'react';
import './AboutMe.css'
import foto from '../../../images/avatar.jpg'


function AboutMe() {
  return (
    <section className="about-me">
      <h2 id="about-me" className="header-sections">
        Студент
      </h2>
      <div className="about-me__info">
        <h3 className="about-me__title">
          Дмитрий
        </h3>
        <h4 className="about-me__subtitle">
          Обучаюсь фронтенд-разработке, 34 года
        </h4>
        <p className="about-me__text">
          Я родом из города Волгограда, но сейчас живу в Санкт-Петербурге.
          Закончил университет, по специальности никак не связанной с 
          вэб-разработкой и с IT в целом. Всегда хотел обучиться программирыванию, 
          и когда появилась такая возможность я её использовал.
          В настоящее время я заканчиваю обучение в Яндекс.Практикуме и 
          собираюсь искать работу фронтенд-разработчиком.
        </p>
        <a 
          className="about-me__link"
          href="https://github.com/DimaOlix"
          target="_blank"
          rel="noopener noreferrer">
          Github
        </a>
        <img className="about-me__foto" src={ foto } alt="моё фото" />
      </div>
    </section>
  )
}

export default AboutMe;