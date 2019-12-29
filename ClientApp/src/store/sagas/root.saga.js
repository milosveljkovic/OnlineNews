import { all, takeEvery } from 'redux-saga/effects';

import {login} from './user.saga'
import {LOGIN} from '../actions/user.actions'
import {GET_NEWS_BY_TAG} from '../actions/news-by-tag.actions'
import {getNewsByTag} from './news-by-tag.saga'
import { REQUEST_NEWS, GET_NOVELTY } from '../actions/news.actions';
import { fetchNews, fetchNovelty } from './news.saga';
import { REQUEST_COMMENTS, ADD_COMMENT } from '../actions/comments.actions';
import { fetchComments, postComment } from './comments.saga';
import { REQUEST_LIKES, ADD_LIKE } from '../actions/likes.actions';
import { fetchLikes, likeNews } from './likes.saga';

export function* rootSaga () {
    yield all (
        [
            takeEvery ( LOGIN, login ),
            takeEvery ( REQUEST_NEWS, fetchNews),
            takeEvery ( GET_NOVELTY, fetchNovelty),
            takeEvery ( REQUEST_COMMENTS,fetchComments),
            takeEvery ( ADD_COMMENT, postComment),
            takeEvery ( GET_NEWS_BY_TAG, getNewsByTag),
            takeEvery ( GET_NOVELTY, fetchNovelty),
            takeEvery ( REQUEST_LIKES, fetchLikes),
            takeEvery ( ADD_LIKE, likeNews)
        ]
    )
}