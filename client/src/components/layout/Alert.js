import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) => 
  alerts !== 0 
  && alerts.length > 0 
  && alerts.map(alert => 
  (
    <div 
      key={alert.id} 
      className={`alert alert-${alert.alertType}`}
    >
      { alert.message }
    </div>
  )
)

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert)
