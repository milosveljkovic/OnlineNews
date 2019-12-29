export const GET_LIKES = "GET_LIKES";
export const REQUEST_LIKES = "REQUEST_LIKES";
export const ADD_LIKE = "ADD_LIKE";
export const ADD_LIKES_SUCCESS= "ADD_LIKE_SUCCESS";

export function getLikes(likes) {
    return {
        type: GET_LIKES,
        likes: likes
    }
}

export function requestLikes(username) {
    return {
        type: REQUEST_LIKES,
        username: username
    }
}

export function addLike(like){
    return {
        type: ADD_LIKE,
        like: like
    }
}

export function addLikeSuccess(likes){
    return {
        type: ADD_LIKES_SUCCESS,
        likes: likes
    }
}