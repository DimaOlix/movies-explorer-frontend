import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function HeaderContent() {
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
            activeClassName="header__select-button_type_active">
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
        aria-label="Меню">
      </button>
    </>
  )
}

export default HeaderContent;