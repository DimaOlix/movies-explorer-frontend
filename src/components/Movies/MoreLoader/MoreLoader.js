import React from 'react';
import './MoreLoader.css'

function MoreLoader({ isloadMore, isDisabled, foundMovies }) {
  return (
    <div className={`more-loader ${ isDisabled(foundMovies) ? 
      'more-loader_hidden' :
      '' }`}>
      <button 
        type='button' 
        className="more-loader__button" 
        name="more-loader"
        onClick={ isloadMore }>
        Ещё
      </button>
    </div>
  )
}

export default MoreLoader;
