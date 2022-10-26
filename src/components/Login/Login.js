import React from 'react';
import { useForm } from '../../hooks/useForm';
import MainApi from '../../utils/MainApi';
import WindowWithForm from '../WindowWithForm/WindowWithForm';

function Login() {
  const{values, handleChange, setValues} = useForm({ email: '', password: '' });

  function handleLogin(e) {
    e.preventDefault();
    MainApi.login(values['email'], values['password'])
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  }
  
  return (
    <WindowWithForm
    title='Рады видеть!'
    text='Ещё не зарегистрированы?'
    link='/signup'
    textLink='Регистрация'
    textButton='Войти'
    name='login'
    onSubmit={ handleLogin }>
      <label className="form__label" htmlFor="email-input">
        E-mail
      </label>
      <input 
        className="form__input form__input_value_email"
        type="email"
        id="email-input"
        name="email"
        value={ values.email }
        onChange={ handleChange }
        placeholder="E-mail"
        minLength="2"
        maxLength="30"
        required 
      />
      <span
        className="form__input-error form__input-error_position_top"
        id="email-input-error">
      </span>

      <label className="form__label" htmlFor="password-input">
        Пароль
      </label>
      <input 
        className="form__input form__input_value_password"
        type="password"
        id="password-input"
        name="password"
        value={ values.password }
        onChange={ handleChange }
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