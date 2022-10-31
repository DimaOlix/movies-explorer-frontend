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
  movies,
  savedMovies,
  setSavedMovies,
  setFoundMovies,
  setMovies,
  requestSavedMovies,
  requestSaveMovie,
  errorLoading,
  notFoundMovies,
  searchMovies,
  getRenderMovies,
  handleClickMoreLoad,
  isDisabledBtnMore,
}) {
  
  // React.useEffect(() => {
  //   requestSavedMovies()
  //     .then((res) => {requestSavedMovies(res); return res;})
      // .then((res) => { 
      //   searchMovies(setSavedMovies, res); 
      // })
  // },[])
  // console.log(movies)

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
          movies={ movies } 
          isLoading={ isLoading }
          setMovies={ setSavedMovies }
        />
        { isLoading ? 
        <Preloader  /> :
        <><MoviesCardList 
            movies={ savedMovies }
            getRenderMovies={ getRenderMovies }
            requestSaveMovie={ requestSaveMovie }
            notFoundMovies={ notFoundMovies }
            errorLoading={ errorLoading }
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