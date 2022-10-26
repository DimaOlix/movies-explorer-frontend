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
  requestSaveMovie,
  isLoading,
  errorLoading,
  notFoundMovies,
  searchMovies,
  getRenderMovies,
  handleClickMoreLoad,
  isDisabledBtnMore,
}) {
  // const [ isLoading, setIsLoading ] = React.useState(false);
  // const [ errorLoading, setErrorLoading ] = React.useState(false);
  // const [ foundMovies, setFoundMovies ] = React.useState([]);
  // const [ notFoundMovies, setNotFoundMovies ] = React.useState(false);
  // const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
  // const [ countMovieCard, setCountMovieCard] = React.useState(1);

  // const detectWindowSize = () => {
  //   setTimeout(setWindowWidth(window.innerWidth), 2000);
  // }

  // React.useEffect(() => {
  //   window.addEventListener('resize', detectWindowSize)

  //   return () => {
  //     window.removeEventListener('resize', detectWindowSize)
  //   }
  // }, [windowWidth])

  
  // React.useEffect(() => {
  //   searchMovies();
  //   loadMovies();
  // }, [])

  //   function loadMovies() {
  //     if(!localStorage.getItem('movies')) {
  //       setIsLoading(true);
  //       MoviesApi.getMovies()
  //       .then((res) => {
  //         localStorage.setItem('movies', JSON.stringify(res));
  //       })
  //       .catch((err) => {setErrorLoading(true)})
  //       .finally(() => setIsLoading(false))
  //     }
  //   }


  //   function searchMovies() {
  //     const foundMovies = [];
  //     const movies = JSON.parse(localStorage.getItem('movies'));
  //     const searchWord = localStorage.getItem('searchWord');
  //     const valueCheckbox = localStorage.getItem('checked');

  //     if(searchWord) {
  //       movies.forEach((el) => {
  //         if(el.nameRU.toLowerCase().includes(searchWord.toLowerCase()) || 
  //           el.nameEN.toLowerCase().includes(searchWord.toLowerCase())) {
  //           foundMovies.push(el);
  //         }
  //       })
  //     }

  //     if(!foundMovies.length && searchWord) {
  //       setNotFoundMovies(true);        
  //     } else {
  //       setNotFoundMovies(false);        
  //     }

  //     setFoundMovies(foundMovies);
  //   }

  //   function handleClickMoreLoad() {
  //     setCountMovieCard(countMovieCard + 1);
  //   }

  //   function isDisabledBtnMore() {
  //     if(windowWidth > 768) {
  //       return countMovieCard * 12 >= foundMovies.length;
  //     } else if(windowWidth > 320 && windowWidth <= 768) {
  //       return countMovieCard * 8 >= foundMovies.length;        
  //     } else {
  //       return countMovieCard * 5 >= foundMovies.length;
  //     }
  //   }

  //   function getRenderMovies() {
  //     if(windowWidth > 768) {
  //       return [ ...foundMovies.slice(0, countMovieCard * 12)];
  //     } else if(windowWidth > 320 && windowWidth <= 768) {
  //       return [ ...foundMovies.slice(0, countMovieCard * 8)];
  //     } else {
  //       return [ ...foundMovies.slice(0, countMovieCard * 5)];
  //     }
  //   }

  return(
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
            isSaved={ isSaved }
            requestSaveMovie={ requestSaveMovie }
            notFoundMovies={ notFoundMovies }
            errorLoading={ errorLoading }
            getRenderMovies={ getRenderMovies }
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

export default Movies;