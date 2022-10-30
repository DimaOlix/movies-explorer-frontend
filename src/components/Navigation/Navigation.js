import React from 'react';
import {  NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Navigation.css'

function Navigation({ isOpen }) {
  const [isMenuPanel, setIsMenuPanel] = React.useContext(CurrentUserContext);

  function removeSearchWord() {
    handleClosePanel()
    localStorage.setItem('searchWord', '')
  }

  function handleClosePanel() {
    setIsMenuPanel(false);
  }

  function handleCloseOverlay(evt) {
    return evt.target.classList.contains('navigation') && setIsMenuPanel(false);
  }

  return (
    <div 
      className={ `navigation ${ !isMenuPanel ? 
        'navigation_hidden'
        : ''}`}
      onClick={ handleCloseOverlay }>
      <div className="navigation__container">
        <button
          type="button" 
          className="navigation__button-close" 
          name="navigation-close"
          onClick={ handleClosePanel } 
        />
        <ul className="navigation__list">
          <li className="navigation__element">
            <NavLink 
              className="navigation__link" 
              activeClassName="navigation__element_type_active" 
              exact to="/"
              onClick={ handleClosePanel }>
              Главная
            </NavLink>
          </li>
          <li className="navigation__element">
            <NavLink 
              className="navigation__link" 
              activeClassName="navigation__element_type_active" 
              to="/movies"
              onClick={ removeSearchWord }>              
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__element">
            <NavLink 
              className="navigation__link" 
              activeClassName="navigation__element_type_active" 
              to="/saved-movies"
              onClick={ removeSearchWord }>             
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <NavLink 
          className="navigation__button-account" 
          to="/profile" 
          onClick={ handleClosePanel } 
        />
      </div>
    </div>
  )
}

export default Navigation;