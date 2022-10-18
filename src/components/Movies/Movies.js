import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer'
import MoreLoader from './MoreLoader/MoreLoader';
import HeaderContent from '../HeaderContent/HeaderContent';

function Movies() {
  return(
    <>
      <Header>
        <HeaderContent />
      </Header>
      <SearchForm />
      <MoviesCardList />
      <MoreLoader />
      <Footer />
    </>
  )
}

export default Movies;