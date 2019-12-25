import { all, takeEvery } from 'redux-saga/effects';

import {login} from './user.saga'

import {LOGIN} from '../actions/user.actions'

export function* rootSaga () {
    yield all (
        [
            takeEvery ( LOGIN, login )
        ]
    )
}