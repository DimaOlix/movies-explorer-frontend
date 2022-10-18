import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';

function Header({ children }) {
  
  return (
    <section className='header'>
      <img className='header__logo' src={ logo } alt='Логотип' />

      { children }

    </section>
  )
}

export default Header;