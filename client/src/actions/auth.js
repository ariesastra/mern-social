import server from '../apis/serverApi'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'
import { setAlert } from './alert'

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const newUser = {
        name,
        email,
        password
    }
    
    try {
        const response = await server.post('/api/users/register', newUser, {})
        
        console.log(response.data);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data.access_token
        })
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