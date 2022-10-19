import React from 'react';
import { Link } from 'react-router-dom';
import './WindowWithForm.css'

function WindowWithForm({ 
  children,
  title,
  text,
  link,
  textLink,
  textButton,
  name,
}) {
  return (
    <section className="window-form">
      <Link className="window-form__logo" to="/" />

      <h2 className="window-form__title">
        { title }
      </h2>
      
      <form 
        className={`form form_type_${name}`}
        name={`${name}`}>

        { children }

        <button 
          className="form__button"
          type="submit" 
          name={`${name}-button`}>
          { textButton }
        </button>        
      </form>
      <p className="window-form__text"> 
        { text }
        <Link className="window-form__link" to={ link }>
          { textLink }
        </Link>
      </p>
    </section>
  )
}

export default WindowWithForm;