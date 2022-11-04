import React, { useEffect } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import MainApi from '../../utils/MainApi';
import WindowWithForm from '../WindowWithForm/WindowWithForm';

function Login({ requestLogin, errorRequest, setErrorRequest }) {

  const { 
    values, 
    handleChange, 
    errors, 
    isValid, 
    resetForm, 
  } = useFormWithValidation({ email: '', password: '' });

  React.useEffect(() => {
    setErrorRequest('');
  }, [])

  function handleLogin(e) {
    e.preventDefault();
    requestLogin(values['email'], values['password']);
    resetForm()
  }
  
  return (
    <WindowWithForm
      title='Рады видеть!'
      text='Ещё не зарегистрированы?'
      link='/signup'
      textLink='Регистрация'
      textButton='Войти'
      name='login'
      onSubmit={ handleLogin }
      isValid={ isValid }
      errorRequest={ errorRequest }>
      <label className="form__label" htmlFor="email-input">
        E-mail
      </label>
      <input 
        className="form__input form__input_value_email"
        type="email"
        id="email-input"
        name="email"
        value={ values['email'] }
        onChange={ handleChange }
        placeholder="E-mail"
        minLength="2"
        maxLength="30"
        required 
      />
      <span
        className="form__input-error form__input-error_position_middle"
        id="email-input-error">
        { errors['email'] }
      </span>

      <label className="form__label" htmlFor="password-input">
        Пароль
      </label>
      <input 
        className="form__input form__input_value_password"
        type="password"
        id="password-input"
        name="password"
        value={ values['password'] }
        onChange={ handleChange }
        placeholder="password"
        minLength="2"
        maxLength="30"
        required 
      />
      <span
        className="form__input-error form__input-error_position_bottom"
        id="password-input-error">
        { errors['password'] }
      </span>
    </WindowWithForm>
  )
}

export default Login;