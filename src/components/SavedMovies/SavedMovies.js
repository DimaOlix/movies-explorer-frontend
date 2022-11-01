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
  myMovies,
  savedMovies,
  setSavedMovies,
  setFoundMovies,
  setMovies,
  requestSavedMovies,
  requestSaveMovie,
  errorLoading,
  searchMovies,
  getRenderMovies,
  handleClickMoreLoad,
  isDisabledBtnMore,
  requestDeleteMovie,
}) {
  const isListSavedMovies = true;
  const [ notFoundMovies, setNotFoundMovies ] = React.useState(false);

  function handleCheckFoundMovie() {
    if(!savedMovies.length && localStorage.getItem('searchWord')) {
      setNotFoundMovies(true);        
    } else {
      setNotFoundMovies(false);        
    }
  }

  React.useEffect(() => {
    handleCheckFoundMovie()
  },[savedMovies])

  return (
    <>
      <Header>
        <HeaderContent 
          setFoundMovies= { setFoundMovies }
          setSavedMovies= { setSavedMovies }
        />
      </Header>
      <main className="main">
        <SearchForm 
          onSubmit={ searchMovies } 
          movies={ myMovies } 
          isLoading={ isLoading }
          setMovies={ setSavedMovies }
        />
        { isLoading ? 
        <Preloader  /> :
        <><MoviesCardList 
            movies={ savedMovies }
            myMovies={ myMovies }
            getRenderMovies={ getRenderMovies }
            requestSaveMovie={ requestSaveMovie }
            notFoundMovies={ notFoundMovies }
            errorLoading={ errorLoading }
            isListSavedMovies={ isListSavedMovies }
            requestDeleteMovie={ requestDeleteMovie }
          />
          <MoreLoader 
            isloadMore={ handleClickMoreLoad }
            isDisabled={ isDisabledBtnMore }
            movies={ savedMovies }
          />
        </> }
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;