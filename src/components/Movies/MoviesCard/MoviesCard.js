import React from 'react';
import './MoviesCard.css';

function MoviesCard({ movie }) {
  const [ isSaved, setIsSaved ] = React.useState(true);
  const [ isListSavedMovies, setIsListSavedMovies ] = React.useState(false);
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
        className={`movies-card__icon movies-card__icon_name_saved ${ !isSaved ? 
          'movies-card__icon_hidden' :
          '' }` }
        name="button-saved"
      />
      <button 
        type="button" 
        className={ `movies-card__icon movies-card__icon_name_save ${ isSaved ? 
          'movies-card__icon_hidden' :
          '' }` } 
        name="button-save"
      />
      <button 
        type="button"       
        className={ `movies-card__icon movies-card__icon_name_delete ${ !isListSavedMovies ? 
          'movies-card__icon_hidden' :
          '' }` } 
        name="button-delete"
      />
    </li>
  )
}

export default MoviesCard;