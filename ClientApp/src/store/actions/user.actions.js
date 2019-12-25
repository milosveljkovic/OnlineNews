export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_UNSUCCESS = 'LOGIN_UNSUCCESS';

export function login (username,password) {
    return {
        type:LOGIN,
        username,
        password
    }
}

export function loginSuccess (user) {
    return {
        type:LOGIN_SUCCESS,
        user
    }
}

export function loginUnsucces () {
    return {
        type:LOGIN_UNSUCCESS
    }
}