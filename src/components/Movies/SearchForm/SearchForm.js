import React from 'react';
import { useForm } from '../../../hooks/useForm';
import './SearchForm.css'

function SearchForm({ 
  onSubmit, 
  movies, 
  isLoading, 
  setMovies, 
}) {
  const [ inputValue, setInputValue ] = React.useState(localStorage.getItem('searchWord'));
  const [ checked, setChecked ] = React.useState(JSON.parse(localStorage.getItem('checked')));
  const{values, handleChange, setValues} = useForm({ value: '' });

  React.useEffect(() => {
    setValues({ 'search-form': inputValue });
  }, [inputValue, setValues])
  
  function handlerSubmit(e) {
    e.preventDefault();
    if(values['search-form']) {
      localStorage.setItem('checked', checked);
      localStorage.setItem('searchWord', values['search-form']);
      // if(determinant === 'movies') {
      //   onSubmit(setMovies, JSON.parse(localStorage.getItem('movies')));
      // } else {
      //   onSubmit(setMovies, JSON.parse(localStorage.getItem('saved-movies')));
      // }
      onSubmit(setMovies, movies);
    }
  }
  
  function handlerCheckbox() {
    setChecked(!checked);
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
        disabled={ isLoading ?
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