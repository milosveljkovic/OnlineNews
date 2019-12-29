import { URL } from '../constants/url';

export function likeService(liked){
    const likeObject = {
        method: "post",
        body: JSON.stringify(liked),
        headers: {'Content-Type':'application/json'}
    };
    
    return fetch(URL+'/api/UserLikes', likeObject)
    .then(response=> response);
}

export function getLikesService(username) {
    return fetch(URL+'/api/UserLikes/' + username)
    .then(response=> response.json());
}