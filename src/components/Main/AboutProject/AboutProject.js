import React from 'react';
import './AboutProject.css'

function AboutProject() {
  return (
    <section className='about-project'>
      <h2 className='header-sections'>
        О проекте
      </h2>
      <ul className='description-project'>
        <li className='description-project__element'>
          <h3 className='description-project__title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='description-project__text'>
            Составление плана, работу над бэкендом, вёрстку, 
            добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className='description-project__element'>
          <h3 className='description-project__title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='description-project__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, 
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>        
        </li>
      </ul>
      <ul className='timeline-project'>
        <li className='timeline-project__element timeline-project__element_left'>
          <h3 className='timeline-project__title'>
            1 неделя
          </h3>
          <p className='timeline-project__subtitle'>
            Back-end
          </p>
        </li>
        <li className='timeline-project__element timeline-project__element_right'>
          <h3 className='timeline-project__title'>
            4 недели
          </h3>
          <p className='timeline-project__subtitle'>
            Front-end
          </p>
        </li>
      </ul>
    </section>
  )
}

export default AboutProject;