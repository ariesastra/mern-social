import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const Navbar = ({
  auth: {isAuthenticated, loading},
  logout
}) => {

  const authNav = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{' '}
          Dashboard
        </Link>
        <a href="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt" />{' '}
          Logout
        </a>
      </li>
    </ul>
  ) 

  const guessNav = (
    <ul>
      <li><Link to="#!">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      {
        !loading && (
          isAuthenticated ? authNav : guessNav
        )
      }
    </nav>
  )
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.authUser
})

export default connect(
  mapStateToProps,
  {
    logout
  }
)(Navbar)
