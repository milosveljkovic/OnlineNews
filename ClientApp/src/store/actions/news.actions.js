
export const GET_NEWS = 'GET_NEWS';
export const GET_NOVELTY = 'GET_NOVELTY';
export const REQUEST_NEWS = "REQUEST_NEWS";
export const GET_NOVELTY_SUCCES = "GET_NOVELTY_SUCCES";
export const ADD_NEWS = "ADD_NEWS";
export const ADD_NEWS_SUCCESS = "ADD_NEWS_SUCCESS";


export function getNews(news){
    return {
        type: GET_NEWS,
        news: news
    }
}

export function requestNews(){
    return {
        type: REQUEST_NEWS
    }
}

export function getNovelty(id){
    return {
        type: GET_NOVELTY,
        id: id
    }
}

export function getNoveltySucces(novelty){
    return {
        type: GET_NOVELTY_SUCCES,
        novelty: novelty
    }
}

export function addNews(novelty){
    return {
        type: ADD_NEWS,
        novelty: novelty
    }

}
export function addNewsSuccess(novelty){
    return {
        type: ADD_NEWS_SUCCESS,
        novelty: novelty
    }
}