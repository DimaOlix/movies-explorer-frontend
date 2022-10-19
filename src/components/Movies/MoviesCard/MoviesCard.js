import React from 'react';
import './MoviesCard.css';

function MoviesCard({ movie }) {
  return (
    <li className="movies-card">
      <img className="movies-card__image" src={ movie["image"] } alt="Картинка" />
      <h3 className="movies-card__title">
        { movie["nameRU"] }
      </h3>
      <p className="movies-card__duration">
        { movie["duration"] }
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