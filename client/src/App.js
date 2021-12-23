import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import './App.css';

const App = () => {
  return (
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
  )
}

export default App;
