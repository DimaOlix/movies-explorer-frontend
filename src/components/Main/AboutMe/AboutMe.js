import React from 'react';
import { Link } from 'react-router-dom';
import './AboutMe.css'
import foto from '../../../images/pic__COLOR_pic.jpg'


function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='header-sections'>
        Студент
      </h2>
      <div className='about-me__info'>
        <h3 className='about-me__title'>
          Дмитрий
        </h3>
        <h4 className='about-me__subtitle'>
          Обучаюсь фронтенд-разработке, 34 года
        </h4>
        <p className='about-me__text'>
          Я родом из города Волгограда, но сейчас живу в Санкт-Петербурге.
          Закончил Ростовский Государственный Университет Путей Сообщения,
          по специальности никак не связанной с вэб-разработкой и с IT в целом.
          Всегда хотел обучиться программирыванию, и когда появилась такая
          возможность я её использовал. В целом обучение давалось не
          легко, но очень увлекательно. В настоящее время я заканчиваю
          обучение в Яндекс.Практикуме и собираюсь искать работу
          фронтенд-разработчиком.
        </p>
        <Link className='about-me__link' to='#'>
          Github
        </Link>
        <img className='about-me__foto' src={ foto } alt='моё фото' />
      </div>
    </section>
  )
}

export default AboutMe;