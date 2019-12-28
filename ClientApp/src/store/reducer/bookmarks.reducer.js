import { GET_BOOKMARKS_BY_USERNAME_SUCCESS, ADD_BOOKMARK_SUCCESS } from '../actions/bookmarks.actions';

const initialState=[];

export function bookmarksReducer( state = initialState, action){
    switch(action.type){
        case GET_BOOKMARKS_BY_USERNAME_SUCCESS:
            var bookmarks = action.bookmarks;
            console.log(bookmarks);
            return [...bookmarks]
        case ADD_BOOKMARK_SUCCESS:
            var bookmark=action.bookmark;
            return [...state,bookmark]
        default:
            return state;
    }
}