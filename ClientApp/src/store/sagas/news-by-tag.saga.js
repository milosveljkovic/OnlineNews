import { getNewsByTagService } from "../../service/service.news-by-tag";
import { getNewsByTagSuccess,getNewsByTagUnsuccess } from "../actions/news-by-tag.actions";
import { put } from 'redux-saga/effects';


export function* getNewsByTag(payload) {
    const response = yield getNewsByTagService(payload.tag);
    if(response.status!==204){
        console.log("UDJEMOVDE saga");
        yield put(getNewsByTagSuccess(response.data));
    }else {
        yield put(getNewsByTagUnsuccess());
    }
}