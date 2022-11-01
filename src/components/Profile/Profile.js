import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import regularExpressionForName from '../../utils/regularExpressionForName';
import Header from '../Header/Header';
import HeaderContent from '../HeaderContent/HeaderContent';
import './Profile.css';

function Profile({ setFoundMovies, requestSavedMovies }) {
  const [ onRegister, setOnRegister ] = React.useState(false);
  const [ isError, setIsError ] = React.useState(false);
  const { 
    values, 
    handleChange, 
    errors, 
    isValid, 
    resetForm,
  } = useFormWithValidation({ value: '' });

  function handleClickRegister () {
    setOnRegister(true);
  }

  return (
    <>
      <Header>
        <HeaderContent 
          setFoundMovies= { setFoundMovies }
          requestSavedMovies= { requestSavedMovies }
        />
      </Header>
      <main className="profile">
        <h2 className="profile__title">
          Привет, Дима
        </h2>

        <form className="profile__form" name="profile">
          <label className="profile__label profile__label_position_top" htmlFor="name-input">
            Имя
            <input 
              className="profile__input profile__input_value_name"
              type="text"
              id="name-input"
              name="name"
              value={ values['name'] }
              onChange={ handleChange }
              pattern={ regularExpressionForName }
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              required
              disabled = { !onRegister }
            />
          </label>
          <span
            className="profile__form-error profile__form-error_position_top"
            id="name-input-error">
            { errors['name'] }
          </span>

          <label className="profile__label profile__label_position_bottom" htmlFor="email-input">
            E-mail
            <input 
              className="profile__input profile__input_value_email"
              type="email"
              id="email-input"
              name="email"
              value={ values['email'] }
              onChange={ handleChange }
              placeholder="E-mail"
              minLength="2"
              maxLength="30"
              required
              disabled = { !onRegister }
            />
          </label>
          <span
            className="profile__form-error profile__form-error_position_bottom"
            id="email-input-error">
            { errors['email'] }
          </span>

          <button 
            className={ `profile__button profile__button_for_save ${ onRegister ?
              '' 
              : 'profile__button_hidden' }` } 
            type="submit"
            name="profile-button-edit"
            disabled={ !isValid }>
            Сохранить
          </button>
          <p className={ `profile__error ${isError ? 
            '' :
            'profile__error_hidden'}` }>
            { `Ошибка` }
          </p>
        </form>

        <button 
          className={ `profile__button ${ !onRegister ?
            '' 
            : 'profile__button_hidden' }` } 
          type="button" 
          name="profile-button-edit"
          onClick={ handleClickRegister }>
          Редактировать
        </button>
        <Link 
          className={ `profile__button profile__button_for_signout ${ !onRegister ?
            '' 
            : 'profile__button_hidden' }` } 
          to="/">
          Выйти из аккаунта
        </Link>
      </main>
    </>
  )
}

export default Profile;