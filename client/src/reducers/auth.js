import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from '../actions/types'

const initialState = {
    access_token: localStorage.access_token,
    isAuthenticated: null,
    loading: true,
    user: null
}

const authUser = (state= initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case USER_LOADED: 
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload.user
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('access_token', payload.access_token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
    
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('access_token')
            return {
                ...state,
                access_token: null,
                isAuthenticated: false,
                loading: false
            }

        default:
            return state
    }
}

export default authUser
