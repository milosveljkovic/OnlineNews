import axios from 'axios';
import { POST } from '../constants/methods'
import { URL } from '../constants/url'

export function generateAuthRequest(method, url, options={}, headers={}) {
    return {
        method: method,
        url: `${URL}/${url}`,
        headers: {
            'Content-Type':'application/json',
            ...headers
        },
        ...options
    }
}

export function registerNewUser (User) {

    var options={
        data:User
    };

    var config = generateAuthRequest(POST, 'register' , options, {});
    return axios(config)
    .then( response => response)
    .catch( er => er );
}  


export function loginUser (auth) {
    
    var config = generateAuthRequest(POST, 'login');

    return axios(config)
    .then(( response ) => {
            return response;
    } )
    .catch((errorMessage) => {
        alert(errorMessage);
        return 'error'
    });
}  