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
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ errorLoading, setErrorLoading ] = React.useState(false);
  const [ foundMovies, setFoundMovies ] = React.useState([]);
  const [ savedMovies, setSavedMovies ] = React.useState([]);
  const [ myMovies, setMyMovies ] = React.useState([]);
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
    requestLoadMovies();
    searchMovies(setFoundMovies, JSON.parse(localStorage.getItem('movies')));
    requestSavedMovies()
      // .then((res) => {
      //   setMyMovies(res); 
      //   return res;
      // })
      // .then((res) => {
      //   if(!localStorage.getItem('searchWord')) {
      //     setSavedMovies(res)
      //   } else {
      //     searchMovies(setSavedMovies, res);
      //   }
      // })
      // .catch((err) => console.log(err))    
  }, [])

  function requestLoadMovies() {
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

  // function requestSavedMovies() {
  //     return MainApi.getSavedMovies();
  // }
  function requestSavedMovies() {
    getSavedMovies()
    .then((res) => {
      setMyMovies(res); 
      return res;
    })
    .then((res) => {
      if(!localStorage.getItem('searchWord')) {
        setSavedMovies(res);
      } else {
        searchMovies(setSavedMovies, res);
      }
    })
    .catch((err) => console.log(err))  
  }

  function getSavedMovies() {
    return MainApi.getSavedMovies();
  }

  async function searchMovies(setMyMovies, movies) {
    const savedMoviesId = [];
    const foundMovies = [];
    const searchWord = localStorage.getItem('searchWord');
    const valueCheckbox = localStorage.getItem('checked');
    await getSavedMovies()
      .then((res) => {
        res.forEach((el) => {
          savedMoviesId.push(el.movieId);
        })
      })

    if(searchWord) {
      movies.forEach((elem) => {
        if(elem.nameRU.toLowerCase().includes(searchWord.toLowerCase()) || 
        elem.nameEN.toLowerCase().includes(searchWord.toLowerCase())) {
          if(savedMoviesId.includes(elem.id)) {
            elem.saved = true;
            foundMovies.push(elem);
          } else {
            foundMovies.push(elem);
          }
        }
      })
    } else {
      setMyMovies(movies);
    }

    // if(!foundMovies.length && searchWord) {
    //   setNotFoundMovies(true);        
    // } else {
    //   setNotFoundMovies(false);        
    // }

    setMyMovies(foundMovies);
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
    .catch((err) => console.log(err))
  }

  function requestDeleteMovie(movieId) {
    MainApi.deleteMovie(movieId)
      .then((res) => {
        setSavedMovies((movies) => {
          return movies.filter((el) => {
            if(el._id !== res._id) {
              return el;
            }            
          })
        })
      })
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
              foundMovies={ foundMovies }
              myMovies={ myMovies }
              setFoundMovies={ setFoundMovies }
              requestSavedMovies={ requestSavedMovies }
              isLoading={ isLoading }
              errorLoading={ errorLoading }
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
              myMovies={ myMovies }
              savedMovies={ savedMovies }
              setSavedMovies={ setSavedMovies }
              setFoundMovies= { setFoundMovies }
              setMovies={ setMyMovies }
              requestSavedMovies={ requestSavedMovies }
              requestSaveMovie={ requestSaveMovie }
              errorLoading={ errorLoading }
              searchMovies={ searchMovies }
              getRenderMovies={ getRenderMovies }
              handleClickMoreLoad={ handleClickMoreLoad }
              isDisabledBtnMore={ isDisabledBtnMore }
              requestDeleteMovie={ requestDeleteMovie }
            />
          </Route>
          <Route path='/profile'>
            <Profile 
              setFoundMovies= { setFoundMovies }
              requestSavedMovies= { requestSavedMovies }
            />
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
          setFoundMovies= { setFoundMovies }
          requestSavedMovies= { requestSavedMovies }
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;