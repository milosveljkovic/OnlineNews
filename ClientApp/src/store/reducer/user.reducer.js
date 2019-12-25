import {Action} from 'redux';
import { LOGIN_SUCCESS, LOGIN_UNSUCCESS } from '../actions/user.actions';

const initialState={
    username:"",
    isJournalist:null,
    loginSuccess:null
}

export function userReducer(state=initialState,action){
    switch(action.type){
        case LOGIN_SUCCESS:
            console.log(action.user)
            return {...action.user}
        case LOGIN_UNSUCCESS:
            // state.login_success=true;
            // return {...state}   
        default:
            return state;
    }
}