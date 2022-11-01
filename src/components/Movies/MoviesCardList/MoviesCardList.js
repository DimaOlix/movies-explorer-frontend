import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  movies,
  myMovies,
  requestSaveMovie,
  notFoundMovies, 
  errorLoading,
  getRenderMovies,
  isListSavedMovies,
  requestDeleteMovie,
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
        notFoundMovies && myMovies.length !== 0 ? 
        <p className='search-form__message'>
          Видео не найдено
        </p> : ''
      }
      {
        getRenderMovies(movies).map((movie, index) => (
          <MoviesCard
            requestSaveMovie={ requestSaveMovie }
            isListSavedMovies={ isListSavedMovies }
            requestDeleteMovie={ requestDeleteMovie }
            movie={ movie }
            key={ index }
          />
        )) 
      }

      {
        !localStorage.getItem('searchWord') && !isListSavedMovies ?
        <p className='search-form__message'>
          Введите ключевое слово для поиска видео и нажмите "Найти".
        </p> :
        ''
      }
      {
        isListSavedMovies && myMovies.length === 0 ?
        <p className='search-form__message'>
          У вас нет сохраненных видео.
        </p> :
        ''
      }
    </ul>

  )
}

export default MoviesCardList;