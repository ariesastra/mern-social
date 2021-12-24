import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types'
import server from '../apis/serverApi'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'

// Load User
export const loadUser = () => async dispatch => {
    const token = localStorage.access_token
    if (token) {
        setAuthToken(token)
    }

    try {
        const response = await server.get('/api/auth')
        
        dispatch({
            type: USER_LOADED,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const newUser = {
        name,
        email,
        password
    }
    
    try {
        const response = await server.post('/api/users/register', newUser, {})
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })

        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors

        if ( errors ) {
            errors.forEach(error => dispatch(setAlert(error, 'danger')))
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Login  User
export const login = ({ email, password }) => async dispatch => {
    const loginCredentials = {
        email,
        password
    }
    
    try {
        const response = await server.post('/api/auth/login', loginCredentials, {})
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })

        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors
        
        if ( errors ) {
            errors.forEach(error => dispatch(setAlert(error, 'danger')))
        }

        dispatch({
            type: LOGIN_FAIL
        })
    }
}