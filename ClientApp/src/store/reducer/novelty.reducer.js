import { GET_NOVELTY, GET_NOVELTY_SUCCES } from '../actions/news.actions';

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

export function noveltyReducer( state = initialState, action){
    switch(action.type){
        case GET_NOVELTY_SUCCES:
            var novelty = (action.novelty);
            return novelty;
        default:
            return state;
    }
}