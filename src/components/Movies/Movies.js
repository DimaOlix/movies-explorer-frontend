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
  requestDeleteMovie,
  isLoading,
  errorLoading,
  searchMovies,
  getRenderMovies,
  handleClickMoreLoad,
  isDisabledBtnMore,
  setIsMenuPanel,
  searchWord,
  setSearchWord,
}) {

  const [ notFoundMovies, setNotFoundMovies ] = React.useState(false);
  
  function handleCheckFoundMovie() {
    if(!foundMovies.length) {
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
          requestSavedMovies= { requestSavedMovies }
          setIsMenuPanel= { setIsMenuPanel }
        />
      </Header>
      <main className="main">
        { isLoading ? 
          <Preloader  /> :
          <>
            <SearchForm 
              onSubmit={ searchMovies } 
              isLoading={ isLoading }
              movies={ JSON.parse(localStorage.getItem('movies')) }
              setMovies={ setFoundMovies }
              searchWord={ searchWord }
              setSearchWord={ setSearchWord }
            />
            <MoviesCardList
              movies={ foundMovies }
              myMovies={ myMovies }
              requestSaveMovie={ requestSaveMovie }
              requestDeleteMovie={ requestDeleteMovie }
              notFoundMovies={ notFoundMovies }
              errorLoading={ errorLoading }
              getRenderMovies={ getRenderMovies }
              searchWord={ searchWord }
            />
            <MoreLoader 
              movies={ foundMovies }
              isloadMore={ handleClickMoreLoad }
              isDisabled={ isDisabledBtnMore }
            />
          </>
        }
      </main>
      <Footer />
    </>
  )
}

export default Movies;