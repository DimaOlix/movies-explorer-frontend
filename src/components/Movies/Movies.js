import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer'
import MoreLoader from './MoreLoader/MoreLoader';
import HeaderContent from '../HeaderContent/HeaderContent';
import Preloader from '../Preloader/Preloader';


function Movies({
  // foundMovies,
  // setFoundMovies,
  isSaved,
  requestSaveMovie,
  isLoading,
  errorLoading,
  notFoundMovies,
  searchMovies,
  getRenderMovies,
  handleClickMoreLoad,
  isDisabledBtnMore,
}) {
  
  const [ foundMovies, setFoundMovies ] = React.useState([]);
  const [renderMovies, setRenderMovies] = React.useState([]);
  // console.log(foundMovies);
  // console.log(renderMovies);
  
  React.useEffect(() => {
    searchMovies(setFoundMovies);
    handleRenderMovies();
  }, [])

  function handleRenderMovies() {
    setRenderMovies(getRenderMovies(foundMovies));
  }
  
  function handleSubmit() {
    searchMovies(setFoundMovies);
    handleRenderMovies();
  }
  


  return(
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
            isSaved={ isSaved }
            requestSaveMovie={ requestSaveMovie }
            notFoundMovies={ notFoundMovies }
            errorLoading={ errorLoading }
            renderMovies={ foundMovies }
          />
          <MoreLoader 
            foundMovies={ foundMovies }
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