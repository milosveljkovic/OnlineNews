import axios from 'axios';
import { POST,GET } from '../constants/methods'
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

export function getBookmarksService (username) {
    console.log("USAO U BOOKMARKS SERVICE")

    var config = generateAuthRequest(GET, `api/BookmarkNews/${username}` , {}, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}  


export function addBookmarkService(bookmark) {
    var options = {
        data: bookmark
    };

    var config = generateAuthRequest(POST, 'api/BookmarkNews/addBookmark', options, {});
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