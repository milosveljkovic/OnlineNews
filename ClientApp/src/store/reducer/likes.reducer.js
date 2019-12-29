import { GET_LIKES, ADD_LIKES_SUCCESS } from "../actions/likes.actions";

const initialState = [];

export function likesReducers(state = initialState, action) {
    switch(action.type){
        case GET_LIKES:
            const likes = (action.likes);
            return [...likes];
        case ADD_LIKES_SUCCESS:
            const like = (action.like);
            return [...state, like];
        default:
            return state;
    }
}