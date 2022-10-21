import React from 'react';
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
      <label className="form__label" for="email-input">
        E-mail
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
        className="form__input-error form__input-error_position_top"
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
        placeholder="password"
        minLength="2"
        maxLength="30"
        required 
      />
      <span
        className="form__input-error form__input-error_position_middle"
        id="password-input-error">
      </span>
    </WindowWithForm>
  )
}

export default Login;