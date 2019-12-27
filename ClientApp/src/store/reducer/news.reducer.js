import { GET_NEWS, ADD_NEWS } from '../actions/news.actions';

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
            return [...state, ...news]
        case ADD_NEWS:
            var novelty = (action.novelty);
            return [...state, novelty];
        default:
            return state;
    }
}