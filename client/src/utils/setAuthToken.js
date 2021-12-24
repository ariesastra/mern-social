/**
 * @description
 * setting the header if there are localStorage 
 * store our access token
 */
// import axios from "axios"
import server from "../apis/serverApi"

const setAuthToken = token => {
    if ( token ) {
        server.defaults.headers.common['x-auth-token'] = token
    } else {
        delete server.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken