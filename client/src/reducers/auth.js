import {
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from '../actions/types'

const initialState = {
    access_token: localStorage.access_token,
    isAuthenticated: null,
    loading: true,
    user: null
}

const register = (state= initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('access_token', payload.access_token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
    
        case REGISTER_FAIL:
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

export default register
