import React from 'react';
import { Link, NavLink } from 'react-router-dom';


function HeaderContent({ setIsMenuPanel, requestSavedMovies }) {

  function handleClickSavedMovies() {
    requestSavedMovies();
  }
  
  return (
    <>
      <ul className="header__select-films">
        <li>
          <NavLink 
            className="header__select-button"
            to="/movies"
            activeClassName="header__select-button_type_active">
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink 
            className="header__select-button"
            to="/saved-movies"
            activeClassName="header__select-button_type_active"
            onClick={ handleClickSavedMovies }>            
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <Link
        className="header__account-button"
        to="/profile">
      </Link>
      <button
        className="header__button-menu"
        type="button"
        aria-label="Меню"
        onClick={ setIsMenuPanel }>
      </button>
    </>
  )
}

export default HeaderContent;