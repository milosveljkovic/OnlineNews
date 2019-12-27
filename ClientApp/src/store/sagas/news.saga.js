import { getNewsService } from "../../service/service.news";
import { getNews } from "../actions/news.actions";
import { put,call } from 'redux-saga/effects';


export function* fetchNews() {
    const news = yield getNewsService();
    yield put(getNews(news));
}