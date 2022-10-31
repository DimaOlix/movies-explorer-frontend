import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer'
import MoreLoader from './MoreLoader/MoreLoader';
import HeaderContent from '../HeaderContent/HeaderContent';
import Preloader from '../Preloader/Preloader';


function Movies({
  isSaved,
  foundMovies,
  setFoundMovies,
  requestSavedMovies,
  requestSaveMovie,
  isLoading,
  errorLoading,
  notFoundMovies,
  searchMovies,
  getRenderMovies,
  handleClickMoreLoad,
  isDisabledBtnMore,
}) {
  
  // React.useEffect(() => {
  //   searchMovies(setFoundMovies, foundMovies);
  // },[localStorage])

  return(
    <>
      <Header>
        <HeaderContent
          setFoundMovies= { setFoundMovies }
          requestSavedMovies= { requestSavedMovies }
        />
      </Header>
      <main className="main">
        <SearchForm 
          onSubmit={ searchMovies } 
          isLoading={ isLoading }
          movies={ JSON.parse(localStorage.getItem('movies')) }
          setMovies={ setFoundMovies } 
        />
        { isLoading ? 
        <Preloader  /> :
        <><MoviesCardList
            isSaved={ isSaved }
            movies={ foundMovies }
            requestSaveMovie={ requestSaveMovie }
            notFoundMovies={ notFoundMovies }
            errorLoading={ errorLoading }
            getRenderMovies={ getRenderMovies }
          />
          <MoreLoader 
            movies={ foundMovies }
            isloadMore={ handleClickMoreLoad }
            isDisabled={ isDisabledBtnMore }
          />
        </> }
      </main>
      <Footer />
    </>
  )
}

export default Movies;