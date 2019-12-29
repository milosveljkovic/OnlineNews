import { URL } from '../constants/url';


export function getCommentsService(id) {
    return fetch(URL + '/api/NewsComments/'+id)
    .then(response => response.json());
}

export function addCommentService(comment){
    console.log(comment)
    const newComment = {
        method: "post",
        body: JSON.stringify(comment),
        headers: {'Content-Type':'application/json'}
    };
    return fetch(URL+'/api/NewsComments', newComment)
    .then(response=>response.json());
}