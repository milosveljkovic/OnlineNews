import { put, call } from 'redux-saga/effects';
import { getLikesService, likeService} from "../../service/service.likes";
import { getLikes, addLikeSuccess } from '../actions/likes.actions';

export function* fetchLikes(username) {
    const likes = yield getLikesService(username.username);
    yield put(getLikes(likes));
}

export function* likeNews (like){
    const response = yield likeService(like.like);
    yield put(addLikeSuccess(response));
}