import React from 'react';
import { Link } from 'react-router-dom';
import WindowWithForm from '../WindowWithForm/WindowWithForm';

function Register({ children }) {
  return (
    <WindowWithForm
      title='Добро пожаловать!'
      text='Уже зарегистрированы?'
      link='/signin'
      textLink='Войти'
      textButton='Зарегистрироваться'
      name='register'>

      <label className="form__label" for="name-input">
        Имя
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
        Email
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

      <label className="form__label" for="password-input">
        Пароль
      </label>
      <input 
        className="form__input form__input_value_password"
        type="password"
        id="password-input"
        name="password"
        placeholder="Пароль"
        minLength="2"
        maxLength="30"
        required 
      />
      <span
        className="form__input-error form__input-error_position_botton"
        id="password-input-error">
      </span>
    </WindowWithForm>
  )
}

export default Register;