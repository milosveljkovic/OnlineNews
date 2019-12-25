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
            var user =(action.user)
            return {
                ...state,
                username:user.username,
                isJournalist:user.isJournalist,
                loginSuccess:true
            }
        case LOGIN_UNSUCCESS:
            return {
                ...state,
                username: "",
                isJournalist: null,
                loginSuccess: false
            } 
        default:
            return state;
    }
}