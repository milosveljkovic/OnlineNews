import { GET_NEWS, ADD_NEWS, GET_NOVELTY } from '../actions/news.actions';

const initialState={
    newsID : "",
    title: "",
    imageURL: "",
    description: "",
    likes: 0,
    dislikes: 0,
    dateOfPublication: "",
    journalist: "",
    tags: []
}

export function newsReducer( state = initialState, action){
    switch(action.type){
        case GET_NEWS:
            var news = (action.news);
            return [...news];
        default:
            return state;
    }
}