import React from 'react';
import './NavTab.css'

function NavTab() {
  return (
    <ul className="nav-tab">
      <li>
        <a className="nav-tab__element" href="#about-project">
          О проекте
        </a>
      </li>
      <li>
        <a className="nav-tab__element" href="#techs">
          Технологии
        </a>
      </li>
      <li>
        <a className="nav-tab__element" href="#about-me">
          Студент
        </a>
      </li>
    </ul>   
  )
}

export default NavTab;