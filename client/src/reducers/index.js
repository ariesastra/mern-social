import { combineReducers } from 'redux'

import alert from './alert'
import authUser from './auth'

export default combineReducers({
  alert,
  authUser
  
})