import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Footer from '../Footer/Footer'
import HeaderContent from '../HeaderContent/HeaderContent';

function SavedMovies({ onMenuPanel }) {
  return (
    <>
      <Header>
        <HeaderContent 
        onMenuPanel = { onMenuPanel } 
      />
      </Header>
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </>
  )
}

export default SavedMovies;