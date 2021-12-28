import { combineReducers } from 'redux'

import alert from './alert'
import authUser from './auth'
import profile from './profile'

export default combineReducers({
  alert,
  authUser,
  profile
})