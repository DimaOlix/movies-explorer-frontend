import React from 'react';
import { useForm } from '../../../hooks/useForm';
import { useFormWithValidation } from '../../../hooks/useFormWithValidation';
import './SearchForm.css'

function SearchForm({ 
  onSubmit, 
  movies, 
  isLoading, 
  setMovies, 
}) {
  const [ checked, setChecked ] = React.useState(JSON.parse(localStorage.getItem('checked')));
  const { 
    values, 
    handleChange,
    isValid,
    resetForm,
  } = useFormWithValidation({ value: '' });

  React.useEffect(() => {
    resetForm({ 'search-form': localStorage.getItem('searchWord') });
  }, [resetForm, checked])
  
  function handlerSubmit(e) {
    e.preventDefault();
    if(values['search-form']) {
      localStorage.setItem('checked', checked);
      localStorage.setItem('searchWord', values['search-form']);
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