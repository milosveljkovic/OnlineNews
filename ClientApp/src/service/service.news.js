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

export function getNoveltyService(id){
    return fetch(URL+'/api/News/'+ id)
    .then(response => response.json());
}

export function addNoveltyService (novelty) {
    var options = {data:novelty};

    var config = generateAuthRequest(POST, 'api/News' , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
} 