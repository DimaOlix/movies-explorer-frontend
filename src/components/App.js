import React from 'react';
import './App.css'
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
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
import ProtectedRoute from './ProtectedRoute';
import { 
  DurationOfShortMovies, 
  QuantityCardsFrom320px, 
  QuantityCardsFrom768px, 
  QuantityCardsFrom1280px,
  UrlServer
} from '../utils/ConstantsUsed';


function App() {
  const [ currentUser, setCurrentUser ] = React.useState({ name: '', email: '' });
  const [ loggedIn, setLoggedIn ] = React.useState(localStorage.getItem('loggedIn'));
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
    if (loggedIn) {
      MainApi.getUser()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        if(err.message === 'Отсутствует токен' || err.message === 'Некорректный токен') {
          localStorage.clear();
          setLoggedIn(false);
          history.push('/');
        }
        console.log(err);
      })
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      searchMovies(setFoundMovies, 
        JSON.parse(localStorage.getItem('movies')), 
        localStorage.getItem('searchWord')
      );
      handleSavedMovies();
    }
  }, [])

  React.useEffect(() => {
    searchMovies(setFoundMovies, 
      JSON.parse(localStorage.getItem('movies')), 
      localStorage.getItem('searchWord')
    );
  }, [savedMovies])

  async function requestLoadMovies() {
    if(!localStorage.getItem('movies')) {
      setIsLoading(true);
      await MoviesApi.getMovies()
      .then((res) => {
        localStorage.setItem('movies', JSON.stringify(res));
      })
      .catch(() => setErrorLoading(true))
      .finally(() => setIsLoading(false))
    }
  }

  function handleSavedMovies(searchWord) {
    getSavedMovies()
    .then((res) => {
      setMyMovies(res); 
      return res;
    })
    .then((res) => {
      if(!searchWord) {
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

  React.useEffect(() => {
    window.addEventListener('resize', detectWindowSize)

    return () => {
      window.removeEventListener('resize', detectWindowSize)
    }
  }, [windowWidth])

  function sortingFoundMovies(movie, savedMoviesId, foundMovies, checked) {
    if((checked === 'true' || checked) && movie.duration < DurationOfShortMovies) {

      checkingSavedMovies(movie, savedMoviesId, foundMovies);
    } else if(checked !== 'true' && !checked) {

      checkingSavedMovies(movie, savedMoviesId, foundMovies);
    }
  }

  function checkingSavedMovies(movie, savedMoviesId, foundMovies) {
    if(savedMoviesId.includes(movie.id)) {
      movie.saved = true;
    }

    foundMovies.push(movie);
  }

  async function searchMovies(
    setMyMovies, 
    movies, 
    searchWord, 
    checked = JSON.parse(localStorage.getItem('checked'))
  ) {
    const savedMoviesId = [];
    const foundMovies = [];

    await getSavedMovies()
      .then((res) => {
        res.forEach((el) => {
          savedMoviesId.push(el.movieId);
        })
      })
    if(searchWord || searchWord === '') {
      movies.forEach((elem) => {
        if(elem.nameRU.toLowerCase().includes(searchWord.toLowerCase()) || 
        elem.nameEN.toLowerCase().includes(searchWord.toLowerCase())) {
          sortingFoundMovies(elem, savedMoviesId, foundMovies, checked);
        }
      })
    }
    setMyMovies(foundMovies);
  }

  function handleClickMoreLoad() {
    setCountMovieCard(countMovieCard + 1);
  }

  function isDisabledBtnMore(movies) {
    if(windowWidth > 768) {
      return countMovieCard * QuantityCardsFrom1280px >= movies.length;
    } else if(windowWidth > 320 && windowWidth <= 768) {
      return countMovieCard * QuantityCardsFrom768px >= movies.length;        
    } else {
      return countMovieCard * QuantityCardsFrom320px >= movies.length;
    }
  }

  function getRenderMovies(movies) {
    if(windowWidth > 768) {
      return [ ...movies.slice(0, countMovieCard * QuantityCardsFrom1280px)];
    } else if(windowWidth > 320 && windowWidth <= 768) {
      return [ ...movies.slice(0, countMovieCard * QuantityCardsFrom768px)];
    } else {
      return [ ...movies.slice(0, countMovieCard * QuantityCardsFrom320px)];
    }
  }

  function requestRegistration(name, email, password, resetForm) {
    setIsLoading(true);
    MainApi.creatUser(name, email, password)
      .then(() => {
        requestLogin(email, password, resetForm);
        resetForm({ 'name': '', 'email':'', 'password': '' });
      })
      .catch((err) => {
        setErrorRequest(err.message);
      })
      .finally(() => setIsLoading(false))
  }

  function requestLogin(email, password, resetForm) {
    setIsLoading(true);
    return MainApi.login(email, password)
      .then(() => {
        setLoggedIn(() => {
          localStorage.setItem('loggedIn', true);
          return true;
        });
        requestLoadMovies();
        history.push('/movies');
        resetForm({ 'email': '', 'password': '' });
      })
      .catch((err) => {
        setErrorRequest(err.message);
      })
      .finally(() => setIsLoading(false))
  }

  function requestEditUser(name, email) {
    setIsLoading(true);
    MainApi.editUser(name, email)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email });
        setErrorRequest('Данные успешно изменены!')
      })
      .catch((err) => {
        setErrorRequest(err.message);
      })
      .finally(() => setIsLoading(false))
  }

  function requestSignout() {
    setIsLoading(true);
    MainApi.signout()
    .then((res) => {
      localStorage.clear();
      setLoggedIn(false);
      history.push('/');
      setFoundMovies([]);
    })
    .catch((err) => {
      setErrorRequest(err);
    })
    .finally(() => setIsLoading(false))
  }

  function requestSaveMovie(movie) {
    const image = `${UrlServer}${movie.image.url}`
    const thumbnail = `${UrlServer}${movie.image.formats.thumbnail.url}`;
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
    .then(() => {
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

  function filterDeleteMovies(movies, deletedMovies) {
    return movies.filter((el) => {
      if(el._id !== deletedMovies._id) {
        return el;
      }
    }) 
  }

  function requestDeleteMovie(movie) {
    const movieId = movie.id ? movie.id : movie.movieId;
    MainApi.deleteMovie(movieId)
      .then((res) => {
        setSavedMovies((movies) => {
          return filterDeleteMovies(movies, res);
        });
        setMyMovies((movies) => {
          return filterDeleteMovies(movies, res);
        });
      })
      .catch((err) => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={ [ currentUser, setCurrentUser ] }>    
      <div className="page">
        <Switch>
          <Route path="/signup">
            { loggedIn ? 
              Redirect('/') : 
              <Register 
                requestRegistration={ requestRegistration } 
                errorRequest={ errorRequest }
                setErrorRequest= { setErrorRequest }
                isLoading={ isLoading }
              />
            }
          </Route>

          <Route path="/signin">
            { loggedIn ? 
              Redirect('/') :
              <Login requestLogin={ requestLogin } 
                errorRequest={ errorRequest }
                setErrorRequest= { setErrorRequest }
                isLoading={ isLoading }
              />
            }
          </Route>

          <ProtectedRoute 
            loggedIn={loggedIn}  
            path="/movies"
            component={ Movies }
            foundMovies={ foundMovies }
            myMovies={ myMovies }
            setFoundMovies={ setFoundMovies }
            requestSavedMovies={ handleSavedMovies }
            isLoading={ isLoading }
            errorLoading={ errorLoading }
            searchMovies={ searchMovies }
            getRenderMovies={ getRenderMovies }
            handleClickMoreLoad={ handleClickMoreLoad }
            isDisabledBtnMore={ isDisabledBtnMore }
            requestSaveMovie={ requestSaveMovie }
            requestDeleteMovie={ requestDeleteMovie }
            setIsMenuPanel={ setIsMenuPanel }
          />

          <ProtectedRoute 
            loggedIn={loggedIn}  
            path="/saved-movies"
            component={ SavedMovies }
            isLoading={ isLoading }
            myMovies={ myMovies }
            savedMovies={ savedMovies }
            setSavedMovies={ setSavedMovies }
            requestSaveMovie={ requestSaveMovie }
            errorLoading={ errorLoading }
            searchMovies={ searchMovies }
            getRenderMovies={ getRenderMovies }
            handleClickMoreLoad={ handleClickMoreLoad }
            isDisabledBtnMore={ isDisabledBtnMore }
            requestDeleteMovie={ requestDeleteMovie }
            setIsMenuPanel={ setIsMenuPanel }
          />

          <ProtectedRoute 
            loggedIn={loggedIn}  
            path="/profile"
            component={ Profile }
            isLoading={ isLoading }
            setFoundMovies= { setFoundMovies }
            requestSavedMovies= { handleSavedMovies }
            setIsMenuPanel= { setIsMenuPanel }
            requestEditUser= { requestEditUser }
            requestSignout= { requestSignout }
            errorRequest={ errorRequest }
            setErrorRequest={ setErrorRequest }
          />

          <Route exact path="/">
            <Main 
              setFoundMovies= { setFoundMovies }
              requestSavedMovies= { handleSavedMovies }
              isMenuPanel= { isMenuPanel }
              setIsMenuPanel= { setIsMenuPanel }
            />
          </Route>

          <Route path="*">
            <ErrorMessage />
          </Route>
        </Switch>

        <Navigation 
          isOpen = { isMenuPanel }
          requestSavedMovies= { handleSavedMovies }
          isMenuPanel= { isMenuPanel }
          setIsMenuPanel= { setIsMenuPanel }
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;