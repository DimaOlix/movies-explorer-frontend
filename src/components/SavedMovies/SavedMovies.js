import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Footer from '../Footer/Footer'
import HeaderContent from '../HeaderContent/HeaderContent';

function SavedMovies() {
  return (
    <>
      <Header>
        <HeaderContent />
      </Header>
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </>
  )
}

export default SavedMovies;