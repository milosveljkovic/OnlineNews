
export const GET_NEWS_BY_TAG = 'GET_NEWS_BY_TAG';
export const GET_NEWS_BY_TAG_SUCCESS = 'GET_NEWS_BY_TAG_SUCCESS';
export const GET_NEWS_BY_TAG_UNSUCCESS = 'GET_NEWS_BY_TAG_UNSUCCESS';

export function getNewsByTag(tag){
    return {
        type: GET_NEWS_BY_TAG,
        tag: tag
    }
}

export function getNewsByTagSuccess(listOfNews){
    return {
        type: GET_NEWS_BY_TAG_SUCCESS,
        news: listOfNews
    }
}

export function getNewsByTagUnsuccess(){
    return {
        type: GET_NEWS_BY_TAG_UNSUCCESS
    }
}