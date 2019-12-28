import { put, call } from 'redux-saga/effects';
import {getBookmarksService, addBookmarkService} from '../../service/service.bookmarks.js'
import { addBookmarkSuccess, getBookmarksByUsernameSuccess } from '../actions/bookmarks.actions';

export function* getBookmarksByUsername(payload){
    const response = yield getBookmarksService(payload.username);
    if(response.status===200){
      yield put(getBookmarksByUsernameSuccess(response.data));  
    }else {
        console.log("error");
    }
}

export function* addBookmark(payload){
    const response = yield addBookmarkService(payload.bookmark);
    if(response.status===200){
        yield put(addBookmarkSuccess(response.data));
    }else {
        console.log("error");
    }
}