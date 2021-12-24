import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// File Import
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import { loadUser } from './actions/auth';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './store'

import './App.css';

if (localStorage.access_token) {
  setAuthToken(localStorage.access_token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path='/' exact element={ <Landing /> } />
            <Route path='/login' exact element={ <Login /> } />
            <Route path='/register' exact element={ <Register /> } />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
