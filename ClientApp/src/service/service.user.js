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

export function registerNewUser (auth) {
    console.log("USAO U REGISTRACIJU")
    var options = {
        data: {
            username: auth.username,
            password: auth.password
        }
    };

    var config = generateAuthRequest(POST, 'api/User/register' , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}  


export function loginUser(auth) {
    //ovaj options se salje kao body, a posle kada vadis podatke vadis ih is response.data
    var options = {
        data: {
            username: auth.username,
            password: auth.password
        }
    };

    var config = generateAuthRequest(POST, 'api/User/login/', options);
    return axios(config)
        .then((response) => {
        console.log(response)
            return response;
    } )
    .catch((errorMessage) => {
        console.log(errorMessage);
        return 'error'
    });
}  