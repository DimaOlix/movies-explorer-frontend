import React from 'react';
import './MoreLoader.css'

function MoreLoader({ isloadMore, isDisabled, movies }) {
  return (
    <div className={`more-loader ${ isDisabled(movies) ? 
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
