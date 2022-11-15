import React from 'react';
import { useHistory } from 'react-router-dom';
import './ErrorMessage.css'


function ErrorMessage() {
  const history = useHistory();

  function handleClickBack() {
    history.goBack();
  }

  return (
    <div className="error">
      <h2 className="error__title">
        { `404` }
      </h2>
      <p className="error__subtitle">
        { `Страница не найдена` }
      </p>
      <button className="error__button-back" onClick={ handleClickBack }>
        Назад
      </button>
    </div>
  )
}

export default ErrorMessage;