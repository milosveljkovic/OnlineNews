export const GET_BOOKMARKS_BY_USERNAME_SUCCESS = "GET_BOOKMARKS_BY_USERNAME_SUCCESS";
export const GET_BOOKMARKS_BY_USERNAME = "GET_BOOKMARKS_BY_USERNAME";
export const ADD_BOOKMARK_SUCCESS = "ADD_BOOKMARK_SUCCESS";
export const ADD_BOOKMARK = "ADD_BOOKMARK";

export function getBookmarksByUsername(username) {
    return {
        type: GET_BOOKMARKS_BY_USERNAME,
        username: username
    }
}

export function getBookmarksByUsernameSuccess(bookmarks) {
    return {
        type: GET_BOOKMARKS_BY_USERNAME_SUCCESS,
        bookmarks: bookmarks
    }
}

export function addBookmark(bookmark) {
    return {
        type: ADD_BOOKMARK,
        bookmark:bookmark
    }
}

export function addBookmarkSuccess(bookmark) {
    return {
        type: ADD_BOOKMARK_SUCCESS,
        bookmark:bookmark
    }
}