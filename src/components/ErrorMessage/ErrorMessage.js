import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorMessage.css'

function ErrorMessage() {
  return (
    <div className="error">
      <h2 className="error__title">
        { `404` }
      </h2>
      <p className="error__subtitle">
        { `Страница не найдена` }
      </p>
      <Link className="error__link-back" to="/">
        Назад
      </Link>
    </div>
  )
}

export default ErrorMessage;