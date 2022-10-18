import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import HeaderContent from '../HeaderContent/HeaderContent';
import './Profile.css';

function Profile() {
  return (
    <>
      <Header>
        <HeaderContent />
      </Header>
      <section className="profile">
        <h2 className="profile__title">
          Привет, Дима
        </h2>
        <ul className="profile__data-conteiner">
          <li className="profile__element profile__element_position_top">
            <p className="profile__name-title">
              Имя
            </p>
            <p className="profile__name-text">
              Дима на работе
            </p>
          </li>          
          <li className="profile__element">
            <p className="profile__email-title">
              Email
            </p>
            <p className="profile__email-text">
              dolix@gmail.com
            </p>
          </li>
        </ul>
        <ul className="profile__link-conteiner">
          <li>
            <button 
              className="profile__button" 
              type="button" 
              name="profile-button-edit"
            >
              Редактировать
            </button>
          </li>
          <li>
            <Link 
              className="profile__button profile__button_for_signout" 
              to="/">
              Выйти из аккаунта
            </Link>
          </li>
        </ul>
      </section>
    </>
  )
}

export default Profile;