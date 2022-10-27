import React from 'react';
import './App.css'
import { Switch, Route } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import Main from './Main/Main.js';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Navigation from './Navigation/Navigation';
import Profile from './Profile/Profile';
import Register from './Register/Register';
import Login from './Login/Login';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import MoviesApi from '../utils/MoviesApi';
import MainApi from '../utils/MainApi';


function App() {
  const [isMenuPanel, setIsMenuPanel] = React.useState(false);
  const [ isSaved, setIsSaved ] = React.useState(false);



  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ errorLoading, setErrorLoading ] = React.useState(false);
  // const [ foundMovies, setFoundMovies ] = React.useState([]);
  const [ notFoundMovies, setNotFoundMovies ] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
  const [ countMovieCard, setCountMovieCard] = React.useState(1);

  const detectWindowSize = () => {
    setTimeout(setWindowWidth(window.innerWidth), 2000);
  }

  React.useEffect(() => {
    window.addEventListener('resize', detectWindowSize)

    return () => {
      window.removeEventListener('resize', detectWindowSize)
    }
  }, [windowWidth])
  
  React.useEffect(() => {
    loadMovies();
    // searchMovies(setFoundMovies);
  }, [])

  function loadMovies() {
    if(!localStorage.getItem('movies')) {
      setIsLoading(true);
      MoviesApi.getMovies()
      .then((res) => {
        res.forEach((movie) => {
            // movie.saved = false 
          })
        localStorage.setItem('movies', JSON.stringify(res));
      })
      .catch((err) => {setErrorLoading(true)})
      .finally(() => setIsLoading(false))
    }
  }

  function searchMovies(setMovies, movies = JSON.parse(localStorage.getItem('movies'))) {
    const searchMovies = [];
    // if(movies) {
    //   movies = JSON.parse(localStorage.getItem('movies'));
    // }
    const searchWord = localStorage.getItem('searchWord');
    const valueCheckbox = localStorage.getItem('checked');

    if(searchWord) {
      movies.forEach((el) => {
        if(el.nameRU.toLowerCase().includes(searchWord.toLowerCase()) || 
          el.nameEN.toLowerCase().includes(searchWord.toLowerCase())) {
          searchMovies.push(el);
        }
      })
    }

    if(!searchMovies.length && searchWord) {
      setNotFoundMovies(true);        
    } else {
      setNotFoundMovies(false);        
    }

    setMovies(searchMovies);
  }

  function handleClickMoreLoad() {
    setCountMovieCard(countMovieCard + 1);
  }

  function isDisabledBtnMore(movies) {
    if(windowWidth > 768) {
      return countMovieCard * 12 >= movies.length;
    } else if(windowWidth > 320 && windowWidth <= 768) {
      return countMovieCard * 8 >= movies.length;        
    } else {
      return countMovieCard * 5 >= movies.length;
    }
  }

  function getRenderMovies(movies) {
    console.log(movies);
    if(windowWidth > 768) {
      return [ ...movies.slice(0, countMovieCard * 12)];
    } else if(windowWidth > 320 && windowWidth <= 768) {
      return [ ...movies.slice(0, countMovieCard * 8)];
    } else {
      return [ ...movies.slice(0, countMovieCard * 5)];
    }
  }


  function requestSaveMovie(movie) {
    const image = `https://api.nomoreparties.co${movie.image.url}`
    const thumbnail = image;
    const { 
      country,
      director,
      duration,
      year,
      description,
      id: movieId,
      trailerLink,
      nameRU,
      nameEN,
    } = movie
    MainApi.createMovie({      
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    })
    .then((res) => {
      movie.saved = true
    })
    .catch((err) => {console.log(err); setIsSaved(true) })
  }

  return (
    <CurrentUserContext.Provider value={ [isMenuPanel, setIsMenuPanel] }>    
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/movies'>
            <Movies
              // foundMovies={ foundMovies }
              // setFoundMovies={ setFoundMovies }
              isSaved={ isSaved }
              isLoading={ isLoading }
              errorLoading={ errorLoading }
              notFoundMovies={ notFoundMovies }
              setNotFoundMovies={ setNotFoundMovies }
              searchMovies={ searchMovies }
              getRenderMovies={ getRenderMovies }
              handleClickMoreLoad={ handleClickMoreLoad }
              isDisabledBtnMore={ isDisabledBtnMore }
              requestSaveMovie={ requestSaveMovie }
            />
          </Route>
          <Route path='/saved-movies'>
            <SavedMovies
              isLoading={ isLoading }
              errorLoading={ errorLoading }
              notFoundMovies={ notFoundMovies }
              searchMovies={ searchMovies }
              getRenderMovies={ getRenderMovies }
              handleClickMoreLoad={ handleClickMoreLoad }
              isDisabledBtnMore={ isDisabledBtnMore }
            />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/signup'>
            <Register />
          </Route>
          <Route path='/signin'>
            <Login />
          </Route>
          <Route path='*'>
            <ErrorMessage />
          </Route>
        </Switch>
        <Navigation 
          isOpen = { isMenuPanel }
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;