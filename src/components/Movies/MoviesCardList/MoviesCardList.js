import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  isSaved,
  movies,
  requestSaveMovie,
  notFoundMovies, 
  errorLoading,
  getRenderMovies,
 }) {

  return (
    <ul className='search-form__list'>
      { 
        errorLoading ? 
        <p className='search-form__message'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением 
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p> :
        '' 
      }
      { 
        notFoundMovies ? 
        <p className='search-form__message'>
          Видео не найдено
        </p> :
        getRenderMovies(movies).map((movie) => (
          <MoviesCard
            isSaved={ isSaved }
            requestSaveMovie={ requestSaveMovie }
            movie={ movie }
            key={ movie.id }
          />
        )) 
      }
    </ul>

  )
}

export default MoviesCardList;