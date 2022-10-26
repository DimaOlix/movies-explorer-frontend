import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Footer from '../Footer/Footer'
import HeaderContent from '../HeaderContent/HeaderContent';
import Preloader from '../Preloader/Preloader';
import MoreLoader from '../Movies/MoreLoader/MoreLoader';
import MainApi from '../../utils/MainApi';

function SavedMovies({
  isLoading,
  errorLoading,
  notFoundMovies,
  searchMovies,
  // getRenderMovies,
  handleClickMoreLoad,
  isDisabledBtnMore,
}) {
  const [savedMovies, setSavedMovies] = React.useState({});

  React.useEffect(() => {
    handleGetSavedMovies()
  }, [])
  console.log(savedMovies);
  function handleGetSavedMovies() {
    MainApi.getSavedMovies()
    .then((res) => {
      setSavedMovies(...res)
    })
  }

  return (
    <>
      <Header>
        <HeaderContent 
      />
      </Header>
      <main className="main">
        <SearchForm onSubmit={ searchMovies } isLoading={ isLoading } />
        { isLoading ? 
        <Preloader  /> :
        <><MoviesCardList 
            notFoundMovies={ notFoundMovies }
            errorLoading={ errorLoading }
            // getRenderMovies={ getRenderMovies }
          />
          <MoreLoader 
            isloadMore={ handleClickMoreLoad }
            isDisabled={ isDisabledBtnMore }
          />
        </> }
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;