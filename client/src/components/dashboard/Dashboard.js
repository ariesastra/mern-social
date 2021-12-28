import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// File import
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import Alert from '../layout/Alert'

const Dashboard = ({ 
  getCurrentProfile, 
  auth: { user }, 
  profile: { loading, profile } 
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])
  
  return loading && profile === null 
    ? <Spinner />
    : 
    <section className="container">
      <h1 className="large text-primary">
        Dashboard
      </h1>
      <p className="lead"><i className="fas fa-user"></i>{' '}
        Welcome { user && user.name }
      </p>
      <Alert />
      { profile !== null ? (
          <Fragment>
            has
          </Fragment>
        ) : (
          <Fragment>
            <p>You don't have any profile info, please add some info.</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile Info
            </Link>
          </Fragment>
        )
      }
    </section> 
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.authUser,
  profile: state.profile
})

export default connect(
  mapStateToProps,
  {
    getCurrentProfile
  }
)(Dashboard)
