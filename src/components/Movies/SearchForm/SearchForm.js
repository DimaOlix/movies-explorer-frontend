import React from 'react';
import './SearchForm.css'

function SearchForm() {
  return (
    <form className="search-form">
      <input 
        type="text" 
        className="search-form__input" 
        name="search-form"
        placeholder="Фильм"
        required
      />

      <button 
        type="submit" 
        className="search-form__button" 
        aria-label="Найти">
        Найти
      </button>

      <input 
        type="checkbox" 
        class="search-form__checkbox" 
        id="form-checkbox" 
        name="form-checkbox" 
        value="yes" 
      />

      <label for="form-checkbox">
        Короткометражки
      </label>

    </form>

  )
}

export default SearchForm;