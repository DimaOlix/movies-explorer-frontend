import React from 'react';
import './Footer.css'

function Footer() {
  return (
    <section className='footer'>
      <h3 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className='footer__elements'>
        <p className='footer__element footer__element_year'>© 2022</p>
        <p className='footer__element'>Яндекс.Практикум</p>
        <p className='footer__element'>Github</p>
      </div>
    </section>
  )
}

export default Footer;