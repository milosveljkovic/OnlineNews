import { put, call } from 'redux-saga/effects';
import { getCommentsService, addCommentService } from "../../service/service.comments";
import { getComments, addCommentSucces } from '../actions/comments.actions';

export function* fetchComments(id) {
    console.log(id.id);
    const comments = yield getCommentsService(id.id);
    console.log(comments);
    yield put(getComments(comments));
}

export function* postComment(comment){
    const response = yield addCommentService(comment.comment);
    yield put(addCommentSucces(comment.comment));
}