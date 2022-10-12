import React from 'react';
import './NavTab.css'
import './__element/nav-tab__element.css'

function NavTab() {
  return (
    <ul className='nav-tab'>
      <li className='nav-tab__element'>
        О проекте
      </li>
      <li className='nav-tab__element'>
        Технологии
      </li>
      <li className='nav-tab__element'>
        Студент
      </li>
    </ul>   
  )
}

export default NavTab;