import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';

function Header() {
  
  return (
    <section className='header'>
      <img className='header__logo' src={ logo } alt='Логотип' />
      <Link className='header__button-signup' to='/signin'>Регистрация</Link>
      <Link className='header__button-signin' to='/signup'>Войти</Link>      
    </section>
  )
}

export default Header;