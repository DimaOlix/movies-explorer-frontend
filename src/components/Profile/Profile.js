import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import regularExpressionForName from '../../utils/regularExpressionForName';
import Header from '../Header/Header';
import HeaderContent from '../HeaderContent/HeaderContent';
import './Profile.css';
import Preloader from '../Preloader/Preloader';
import regularExpressionForEmail from '../../utils/regularExpressionForEmail';


function Profile({
  isLoading, 
  setFoundMovies, 
  requestSavedMovies,
  setIsMenuPanel,
  requestEditUser,
  requestSignout,
  errorRequest,
  setErrorRequest,
}) {
  
  const [ currentUser, ] = React.useContext(CurrentUserContext);
  const [ onRegister, setOnRegister ] = React.useState(false);
  const { 
    values,
    setValues,
    handleChange, 
    errors, 
    isValid, 
    resetForm,
  } = useFormWithValidation({ name: currentUser.name, email: currentUser.email });

  React.useEffect(() => {
    setErrorRequest('');
  }, [])

  React.useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [currentUser])

  function checkIdenticalData() {
    return currentUser.name === values.name && currentUser.email === values.email;
  }

  function handleClickRegister () {
    setOnRegister(true);
  }

  function handleSignout(e) {
    e.preventDefault();
    requestSignout();    
  }

  function handleSubmit(e) {
    e.preventDefault();
    requestEditUser(values.name, values.email);
    resetForm({ name: '', email: '' });
  }

  return (
    <>
      { isLoading ?
        <Preloader /> :
        <>
          <Header>
            <HeaderContent 
              setFoundMovies= { setFoundMovies }
              requestSavedMovies= { requestSavedMovies }
              setIsMenuPanel= { setIsMenuPanel }
            />
          </Header>
          <main className="profile">
          <h2 className="profile__title">
            { `Привет, ${currentUser.name}` }
          </h2>
          <form
            className="profile__form"
            name="profile"
            onSubmit={ handleSubmit }>

            <label className="profile__label profile__label_position_top" htmlFor="name-input">
              Имя
              <input
                className="profile__input profile__input_value_name"
                type="text"
                id="name-input"
                name="name"
                value={ values.name }
                onChange={ handleChange }
                pattern={ regularExpressionForName }
                // placeholder={ currentUser.name }
                minLength="2"
                maxLength="30"
                required
                disabled={ !onRegister } />
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
                value={ values.email }
                onChange={ handleChange }
                pattern={ regularExpressionForEmail }
                // placeholder={ currentUser.email }
                minLength="2"
                maxLength="30"
                required
                disabled={ !onRegister } />
            </label>
            <span
              className="profile__form-error profile__form-error_position_bottom"
              id="email-input-error">
              { errors['email'] }
            </span>

            <p className={ `profile__text-request` }>
              { errorRequest }
            </p>

            <button
              className={ `profile__button profile__button_for_save ${onRegister ?
                ''
                : 'profile__button_hidden'}` }
              type="submit"
              name="profile-button-edit"
              disabled={ !isValid || checkIdenticalData() }>
              Сохранить
            </button>
          </form>
          <button
            className={`profile__button ${!onRegister ?
              ''
              : 'profile__button_hidden'}` }
            type="button"
            name="profile-button-edit"
            onClick={ handleClickRegister }>
            Редактировать
          </button>
          <button
            className={ `profile__button profile__button_for_signout ${!onRegister ?
              ''
              : 'profile__button_hidden'}` }
            onClick={ handleSignout }>
            Выйти из аккаунта
          </button>
          </main>
        </>
      }
    </>
  )
}

export default Profile;