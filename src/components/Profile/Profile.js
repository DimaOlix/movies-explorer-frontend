import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import HeaderContent from '../HeaderContent/HeaderContent';
import './Profile.css';

function Profile({ onMenuPanel }) {
  const [ onRegister, setOnRegister ] = React.useState(false);

  function handleClickRegister () {
    setOnRegister(true);
  }

  return (
    <>
      <Header>
        <HeaderContent onMenuPanel={ onMenuPanel } />
      </Header>
      <section className="profile">
        <h2 className="profile__title">
          Привет, Дима
        </h2>

        <form className="profile__form" name="profile">
          <label className="profile__label profile__label_position_top" for="name-input">
            Имя
            <input 
              className="profile__input profile__input_value_name"
              type="text"
              id="name-input"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              required
              disabled = { !onRegister }
            />
          </label>

          <label className="profile__label profile__label_position_bottom" for="email-input">
            E-mail
            <input 
              className="profile__input profile__input_value_email"
              type="email"
              id="email-input"
              name="email"
              placeholder="E-mail"
              minLength="2"
              maxLength="30"
              required
              disabled = { !onRegister }
            />
          </label>

          <button 
            className={ `profile__button profile__button_for_save ${ onRegister ?
              '' 
              : 'profile__button_hidden' }` } 
            type="submit"
            name="profile-button-edit">
            Сохранить
          </button>
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
      </section>
    </>
  )
}

export default Profile;