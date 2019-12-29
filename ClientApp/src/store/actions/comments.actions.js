export const GET_COMMENTS = "GET_COMMENTS";
export const REQUEST_COMMENTS = "REQUEST_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";

export function getComments(comments) {
    return {
        type: GET_COMMENTS,
        comments: comments
    }
}
export function requestComments(id) {
    return {
        type: REQUEST_COMMENTS,
        id: id
    }
}

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment:comment
    }
}

export function addCommentSucces(comment) {
    return {
        type: ADD_COMMENT_SUCCESS,
        comment:comment
    }
}