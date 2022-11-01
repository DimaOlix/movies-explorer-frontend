import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer'
import MoreLoader from './MoreLoader/MoreLoader';
import HeaderContent from '../HeaderContent/HeaderContent';
import Preloader from '../Preloader/Preloader';


function Movies({
  foundMovies,
  myMovies,
  setFoundMovies,
  requestSavedMovies,
  requestSaveMovie,
  isLoading,
  errorLoading,
  searchMovies,
  getRenderMovies,
  handleClickMoreLoad,
  isDisabledBtnMore,
}) {

  const [ notFoundMovies, setNotFoundMovies ] = React.useState(false);

  function handleCheckFoundMovie() {
    if(!foundMovies.length && localStorage.getItem('searchWord')) {
      setNotFoundMovies(true);        
    } else {
      setNotFoundMovies(false);        
    }
  }
  
  React.useEffect(() => {
    handleCheckFoundMovie()
  },[foundMovies])

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
            movies={ foundMovies }
            myMovies={ myMovies }
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