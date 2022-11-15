import React from 'react';
import { useFormWithValidation } from '../../../hooks/useFormWithValidation';
import './SearchForm.css'


function SearchForm({ 
  onSubmit, 
  movies, 
  isLoading, 
  setMovies,
  isListSavedMovies,  
}) {

  const [ checked, setChecked ] = React.useState(isListSavedMovies ? 
    false : 
    JSON.parse(localStorage.getItem('checked')));
  const { 
    values, 
    handleChange,
    isValid,
  } = useFormWithValidation({ 'search-form': isListSavedMovies ? 
    '' : 
    localStorage.getItem('searchWord'), 'form-checkbox': checked });
 
  function handlerSubmit(e) {
    e.preventDefault();
    if(values['search-form'] && !isListSavedMovies) {
      localStorage.setItem('searchWord', values['search-form']);
      if(movies === null) {
        return onSubmit(setMovies, JSON.parse(localStorage.getItem('movies')), values['search-form']);
      }      
    }
    onSubmit(setMovies, movies, values['search-form'], checked);
  }
  
  function handlerCheckbox() {
    if(!isListSavedMovies) {
      setChecked((check) => {
        localStorage.setItem('checked', !check);
        return !check;
      });
    } else {
      setChecked((check) => {
          return !check;
        });
    }
    onSubmit(setMovies, movies, values['search-form'], !checked);
  }
  
  return (
    <form className="search-form" 
    name="search-form"
    onSubmit={ handlerSubmit }>
      <input 
        type="text" 
        className="search-form__input" 
        name="search-form"
        onChange={ handleChange }
        value = { values['search-form'] }
        placeholder="Фильм"
        required
      />

      <button 
        type="submit" 
        className="search-form__button" 
        aria-label="Найти"
        disabled={ isLoading || !isValid ?
        true :
        false }>
        Найти
      </button>

      <input 
        type="checkbox" 
        className="search-form__checkbox" 
        id="form-checkbox" 
        name="form-checkbox"
        checked={ checked }
        onChange={ handlerCheckbox }
      />

      <label htmlFor="form-checkbox">
        Короткометражки
      </label>

    </form>

  )
}

export default SearchForm;