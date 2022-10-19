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


function App() {
  const [isMenuPanel, setIsMenuPanel] = React.useState(false);

  function handleMenuPanel() {
    setIsMenuPanel(true);
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
              onMenuPanel = { handleMenuPanel }
            />
          </Route>
          <Route path='/saved-movies'>
            <SavedMovies onMenuPanel = { handleMenuPanel }
          />
          </Route>
          <Route path='/profile'>
            <Profile onMenuPanel = { handleMenuPanel } 
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
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;