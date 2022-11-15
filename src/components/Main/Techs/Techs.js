import React from 'react';
import './Techs.css'

function Techs() {
  return (
    <section className="techs">
      <h2 id="techs" className="header-sections">
        Технологии
      </h2>
      <div className="techs__conteiner">
        <h2 className="techs__title">
          7 технологий
        </h2>
        <p className="techs__subtitle">
          На курсе веб-разработки мы освоили технологии, 
          которые применили в дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__element">
            HTML
          </li>
          <li className="techs__element">
            CSS
          </li>
          <li className="techs__element">
            JS
          </li>
          <li className="techs__element">
            React
          </li>
          <li className="techs__element">
            GIT
          </li>
          <li className="techs__element">
            Express.js
          </li>
          <li className="techs__element">
            mongoDB
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;