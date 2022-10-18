import React from 'react';
import {  NavLink } from 'react-router-dom';
import './Navigation.css'

function Navigation() {
  return (
    <section className="navigation">
      <div className="navigation__container">
        <button
          type="button" 
          className="navigation__button-close" 
          name="navigation-close" 
        />
        <ul className="navigation__list">
          <li className="navigation__element">
            <NavLink 
              className="navigation__link" 
              activeClassName="navigation__element_type_active" 
              exact to="/">
              Главная
            </NavLink>
          </li>
          <li className="navigation__element">
            <NavLink 
              className="navigation__link" 
              activeClassName="navigation__element_type_active" 
              to="/movies">
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__element">
            <NavLink 
              className="navigation__link" 
              activeClassName="navigation__element_type_active" 
              to="/saved-movies">
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <NavLink className="navigation__button-account" to="/profile" />
      </div>
    </section>
  )
}

export default Navigation;