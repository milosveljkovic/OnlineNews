import { all, takeEvery } from 'redux-saga/effects';

import {login} from './user.saga'
import {LOGIN} from '../actions/user.actions'
import { REQUEST_NEWS } from '../actions/news.actions';
import { fetchNews } from './news.saga';
import {GET_NEWS_BY_TAG} from '../actions/news-by-tag.actions'
import {getNewsByTag} from './news-by-tag.saga'

export function* rootSaga () {
    yield all (
        [
            takeEvery ( LOGIN, login ),
            takeEvery ( REQUEST_NEWS, fetchNews),
            takeEvery (GET_NEWS_BY_TAG, getNewsByTag)
        ]
    )
}