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
  onSubmit,
  isValid,
  errorRequest,
  isLoading,
}) {


  return (
    <div className="window-form">
      <Link className="window-form__logo" to="/" />

      <h2 className="window-form__title">
        { title }
      </h2>
      
      <form 
        className={`form form_type_${name}`}
        name={`${name}`}
        onSubmit={ onSubmit }>

        { children }

        <p className={ `form__request-error ${ !errorRequest ? 
          'form__request-error_hidden' : 
          '' }` }>
          { errorRequest }
        </p>
        <button 
          className="form__button"
          type="submit" 
          name={`${name}-button`}
          disabled={ !isValid || isLoading }>
          { textButton }
        </button>        
      <p className="window-form__text"> 
        { text }
        <Link className="window-form__link" to={ link }>
          { textLink }
        </Link>
      </p>
      </form>
    </div>
  )
}

export default WindowWithForm;