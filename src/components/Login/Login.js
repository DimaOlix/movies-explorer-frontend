import React from 'react';
import { Link } from 'react-router-dom';
import WindowWithForm from '../WindowWithForm/WindowWithForm';

function Login() {
  return (
    <WindowWithForm
    title='Рады видеть!'
    text='Ещё не зарегистрированы?'
    link='/signup'
    textLink='Регистрация'
    textButton='Войти'
    name='login'>
      <label className="form__label" for="name-input">
        E-mail
      </label>
      <input 
        className="form__input form__input_value_name"
        type="text"
        id="name-input"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="30"
        required 
      />
      <span
        className="form__input-error form__input-error_position_top"
        id="name-input-error">
      </span>

      <label className="form__label" for="email-input">
        Пароль
      </label>
      <input 
        className="form__input form__input_value_email"
        type="email"
        id="email-input"
        name="email"
        placeholder="E-mail"
        minLength="2"
        maxLength="30"
        required 
      />
      <span
        className="form__input-error form__input-error_position_middle"
        id="email-input-error">
      </span>
    </WindowWithForm>
  )
}

export default Login;