import React from 'react';
import './MoreLoader.css'

function MoreLoader({ isloadMore, isDisabled }) {
  return (
    <div className={`more-loader ${ isDisabled() ? 
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
