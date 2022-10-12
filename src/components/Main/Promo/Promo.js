import React from 'react';
import './Promo.css'
import NavTab from '../NavTab/NavTab';
import './__title/promo__title.css'

function Promo() {
  return (
    <section className='promo'>
      <h1 className='promo__title'>
      Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavTab />
    </section>    
  )
}

export default Promo;