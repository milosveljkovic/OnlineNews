import { GET_NEWS_BY_TAG_SUCCESS, GET_NEWS_BY_TAG_UNSUCCESS } from '../actions/news-by-tag.actions';

const initialState=[];

export function newsByTagReducer( state = initialState, action){
    switch(action.type){
        case GET_NEWS_BY_TAG_SUCCESS:
            var news = action.news;
            console.log(news);
            return [...news]
        case GET_NEWS_BY_TAG_UNSUCCESS:
            return []
        default:
            return state;
    }
}