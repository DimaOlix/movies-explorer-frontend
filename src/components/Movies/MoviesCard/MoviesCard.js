import React from 'react';
import './MoviesCard.css';

function MoviesCard({ 
  movie,
  requestSaveMovie,
  isListSavedMovies,
  requestDeleteMovie,
}) {

  const duration = `${Math.trunc(movie.duration / 60)}ч ${movie.duration % 60}мин`;
  
  function handleSaveMovie() {
    requestSaveMovie(movie);
  }

  function handleDeleteMovie() {
    requestDeleteMovie(movie._id)
  }

  function handleImageUrlMovie() {
    if(typeof(movie.image) !== 'string') {
      return `https://api.nomoreparties.co${movie.image.url}`;
    }

    return movie.image;
  }

  return (
    <li className="movies-card">
      <img className="movies-card__image" src={ handleImageUrlMovie() } alt="Картинка" />
      <h3 className="movies-card__title">
        { movie["nameRU"] }
      </h3>
      <p className="movies-card__duration">
        { duration }
      </p>
      <button 
        type="button" 
        className={`movies-card__icon movies-card__icon_name_saved ${ !movie.saved ? 
          'movies-card__icon_hidden' :
          '' }` }
        name="button-saved"
      />
      <button 
        type="button" 
        className={ `movies-card__icon movies-card__icon_name_save ${ movie.saved || isListSavedMovies ? 
          'movies-card__icon_hidden' :
          '' }` } 
        name="button-save"
        onClick={ handleSaveMovie }
      />
      <button 
        type="button"       
        className={ `movies-card__icon movies-card__icon_name_delete ${ !isListSavedMovies ? 
          'movies-card__icon_hidden' :
          '' }` } 
        name="button-delete"
        onClick={ handleDeleteMovie }
      />
    </li>
  )
}

export default MoviesCard;