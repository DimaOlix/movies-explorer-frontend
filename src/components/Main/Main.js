import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import './header-sections/header-sections.css'
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs'
import AboutMe from './AboutMe/AboutMe'
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main() {
  
  return (
    <>
      <Header>
        <Link className="header__button-signup" to="/signup">Регистрация</Link>
        <Link className="header__button-signin" to="/signin">Войти</Link>      
      </Header>
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}

export default Main;