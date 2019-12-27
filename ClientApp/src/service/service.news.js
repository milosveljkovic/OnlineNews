import axios from 'axios';
import { POST } from '../constants/methods';
import { URL } from '../constants/url';

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


export function getNewsService() {
    return fetch(URL + '/api/News')
    .then(response=> response.json());
}
