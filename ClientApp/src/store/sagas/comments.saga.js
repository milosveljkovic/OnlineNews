import { put, call } from 'redux-saga/effects';
import { getCommentsService, addCommentService } from "../../service/service.comments";
import { getComments, addCommentSucces } from '../actions/comments.actions';

export function* fetchComments(id) {
    const comments = yield getCommentsService(id.id);
    yield put(getComments(comments));
}

export function* postComment(comment){
    const response = yield addCommentService(comment.comment);
    yield put(addCommentSucces(comment.comment));
}