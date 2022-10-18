import React from 'react';
import './MoviesCard.css';

function MoviesCard() {
  return (
    <li className="movies-card">
      <img className="movies-card__image" src="https://w-dog.ru/wallpapers/9/4/312027660287928/kanarskie-ostrova-atlanticheskij-okean-nebo-noch-zvezdy-mlechnyj-put.jpg" alt="Картинка" />
      <h3 className="movies-card__title">
        ФильмФильмФильмФильмФильмФильмФильмФильмФильмФильм
      </h3>
      <p className="movies-card__duration">
        12:00
      </p>
      <button 
        type="button" 
        className="movies-card__saved-icon" 
        name="button-saved"
      />
      <button 
        type="button" 
        className="movies-card__save-icon" 
        name="button-save"
      />
      <button 
        type="button"       
        className="movies-card__delete-icon" 
        name="button-delete"
      />
    </li>
  )
}

export default MoviesCard;