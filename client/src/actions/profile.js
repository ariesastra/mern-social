import { 
  CREATE_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR
} from "./types"

import server from "../apis/serverApi"
import { setAlert } from "./alert"

// GET CURRENT USER PROFILE
export const getCurrentProfile = () => async dispatch => {
  
  try {
    const response = await server.get('/api/profile/me')

    dispatch({
      type: GET_PROFILE,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status
      }
    })
  }
}

// CREATE OR UPDATE PROFILE ACTIONS
export const createProfile = (
  formProfile,
  navigate,
  edit= false
) => async dispatch => {
  try {
    const response = await server.post('/api/profile', formProfile)

    dispatch({
      type: GET_PROFILE,
      payload: response.data
    })

    dispatch(
      setAlert(
      edit ? 'Profile is Created' : 'Profile updated',
      'success'
    ))

    if (!edit) {
      navigate('/dashboard')
    }
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status
      }
    })
  }
}
