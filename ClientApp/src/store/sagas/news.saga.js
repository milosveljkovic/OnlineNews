import { getNewsService,getNoveltyService } from "../../service/service.news";
import { getNews, getNovelty, getNoveltySucces } from "../actions/news.actions";
import { put,call } from 'redux-saga/effects';


export function* fetchNews() {
    const news = yield getNewsService();
    yield put(getNews(news));
}

export function* fetchNovelty(id) {
    const novelty = yield getNoveltyService(id.id);
    console.log(novelty);
    yield put(getNoveltySucces(novelty));
}
