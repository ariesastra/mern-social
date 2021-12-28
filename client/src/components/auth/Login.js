import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
import Alert from '../layout/Alert'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData

  const onChange = e => setFormData({
    ...formData, 
    [e.target.name]: e.target.value
  })

  const doLogin = async e => {
    e.preventDefault()
    
    login({email, password})
  }

  // Redirect if isAuthenticated = true
  if ( isAuthenticated ) {
    return <Navigate to="/dashboard" />
  }

  return (
  <section className="container">
    <Alert />
    <h1 className="large text-primary">Sign In</h1>
    <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
    <form className="form" onSubmit={e => doLogin(e)}>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          required
          value={email}
          onChange={e => onChange(e)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Login" />
    </form>
    <p className="my-1">
      Don't have an account? <Link to="/register">Sign Up</Link>
    </p>
  </section>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.authUser.isAuthenticated
})

export default connect(
  mapStateToProps, 
  { login }
)(Login)
