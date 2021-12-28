import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// File Import
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import { loadUser } from './actions/auth';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileForm from './components/profile-form/ProfileForm';

// Redux
import { Provider } from 'react-redux';
import store from './store'

// Style
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
            <Route path='/login' element={ <Login /> } />
            <Route path='/register' element={ <Register /> } />
            <Route 
              path='/dashboard' 
              element={ <PrivateRoute component={Dashboard} /> } 
            />
            <Route 
              path='/create-profile' 
              element={ <PrivateRoute component={ProfileForm} /> } 
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
