import React from 'react';
import WindowWithForm from '../WindowWithForm/WindowWithForm';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import regularExpressionForName from '../../utils/regularExpressionForName';


function Register({ requestRegistration, errorRequest, setErrorRequest }) {
  
  const { 
    values, 
    handleChange,
    errors, 
    isValid, 
    resetForm,
  } = useFormWithValidation({ value: '' });

  React.useEffect(() => {
    setErrorRequest('');
  }, [])

  function handleRegistration(e) {
    e.preventDefault();
    requestRegistration(values['name'], values['email'], values['password']);
    resetForm();
  }
  
  return (
    <WindowWithForm
      title='Добро пожаловать!'
      text='Уже зарегистрированы?'
      link='/signin'
      textLink='Войти'
      textButton='Зарегистрироваться'
      name='register'
      isValid={ isValid }
      onSubmit={ handleRegistration }
      errorRequest={ errorRequest }>

      <label className="form__label" htmlFor="name-input">
        Имя
      </label>
      <input 
        className="form__input form__input_value_name"
        type="text"
        id="name-input"
        name="name"
        value={ values['name'] }
        onChange={ handleChange }
        pattern={ regularExpressionForName }
        title="Можно использовать: латиницу, кирилицу, пробел и '-'"
        placeholder="Имя"
        minLength="2"
        maxLength="30"
        required 
      />
      <span
        className="form__input-error form__input-error_position_top"
        id="name-input-error">
        { errors['name'] }
      </span>

      <label className="form__label" htmlFor="email-input">
        Email
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
        placeholder="Пароль"
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

export default Register;