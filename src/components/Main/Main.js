import React from 'react';
import './Main.css';
import '../shared/header-sections/header-sections.css'
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs'
import AboutMe from './AboutMe/AboutMe'
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main() {
  
  return (
    <section className='main'>
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </section>
  )
}

export default Main;