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
  getRenderMovies,
  handleClickMoreLoad,
  isDisabledBtnMore,
}) {
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [renderMovies, setRenderMovies] = React.useState([]);

  React.useEffect(() => {
    handleGetSavedMovies();
    searchMovies(setSavedMovies);
    handleRenderMovies();
  }, [])

  console.log(savedMovies);
  console.log(renderMovies);



  function handleGetSavedMovies() {
    MainApi.getSavedMovies()
    .then((res) => {
      setSavedMovies([...res])
    })
  }

  function handleRenderMovies() {
    setRenderMovies(getRenderMovies(savedMovies));
  }
  
  function handleSubmit() {
    searchMovies(setSavedMovies, savedMovies);
    handleRenderMovies();
  }

  return (
    <>
      <Header>
        <HeaderContent 
      />
      </Header>
      <main className="main">
        <SearchForm onSubmit={ handleSubmit } isLoading={ isLoading } />
        { isLoading ? 
        <Preloader  /> :
        <><MoviesCardList 
            notFoundMovies={ notFoundMovies }
            errorLoading={ errorLoading }
            renderMovies={ renderMovies }
          />
          <MoreLoader 
            foundMovies={ savedMovies }
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