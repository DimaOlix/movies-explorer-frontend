import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../../utils/movies';

function MoviesCardList() {
  return (
    <ul className='movies-card-list'>
      { movies.map((movie) => (
        <MoviesCard 
        movie={movie}
        key={ movie._id }
        />
      )) }
    </ul>

  )
}

export default MoviesCardList;