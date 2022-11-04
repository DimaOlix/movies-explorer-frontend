import React from 'react';
import './App.css'
import { Switch, Route, useHistory } from 'react-router-dom';
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
  const [ currentUser, setCurrentUser ] = React.useState({ name: '', email: '' });
  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const history = useHistory();
  const [ isMenuPanel, setIsMenuPanel ] = React.useState(false);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ errorLoading, setErrorLoading ] = React.useState(false);
  const [ errorRequest, setErrorRequest ] = React.useState('');
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
  }, [])

  function requestLoadMovies() {
    if(!localStorage.getItem('movies')) {
      setIsLoading(true);
      MoviesApi.getMovies()
      .then((res) => {
        res.forEach((movie) => {
          })
        localStorage.setItem('movies', JSON.stringify(res));
      })
      .catch((err) => {setErrorLoading(true)})
      .finally(() => setIsLoading(false))
    }
  }

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

  function requestRegistration(name, email, password) {
    return MainApi.creatUser(name, email, password)
      .then((res) => {
        history.push('/movies');
      })
      .catch((err) => {
        return err;
      })
      .then((res) => {
        setErrorRequest(res.message);
      })
  }

  function requestLogin(email, password) {
    return MainApi.login(email, password)
    .then((res) => {
      history.push('/movies');
    })
    .catch((err) => {
      return err;
    })
    .then((res) => {
      setErrorRequest(res.message);
    })
  }

  function requestSaveMovie(movie) {
    const image = `https://api.nomoreparties.co${movie.image.url}`
    const thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
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
    console.log(movie);
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
      setFoundMovies((state) => {
        return state.map(el => {
          if (el.id === movie.id) {
            el.saved = true;
          }
          return el;
        });
      });
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
    <CurrentUserContext.Provider value={ [ currentUser, setCurrentUser ] }>    
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
              setIsMenuPanel={ setIsMenuPanel }
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
              setIsMenuPanel={ setIsMenuPanel }
            />
          </Route>
          <Route path='/profile'>
            <Profile 
              setFoundMovies= { setFoundMovies }
              requestSavedMovies= { requestSavedMovies }
            />
          </Route>
          <Route path='/signup'>
            <Register 
              requestRegistration={ requestRegistration } 
              errorRequest={ errorRequest }
              setErrorRequest= { setErrorRequest }
            />
          </Route>
          <Route path='/signin'>
            <Login requestLogin={ requestLogin } 
              errorRequest={ errorRequest }
              setErrorRequest= { setErrorRequest }
            />
          </Route>
          <Route path='*'>
            <ErrorMessage />
          </Route>
        </Switch>
        <Navigation 
          isOpen = { isMenuPanel }
          setFoundMovies= { setFoundMovies }
          requestSavedMovies= { requestSavedMovies }
          isMenuPanel= { isMenuPanel }
          setIsMenuPanel= { setIsMenuPanel }
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;