import { loginUser } from "../../service/service.user";
import { put } from 'redux-saga/effects';
import { loginSuccess,loginUnsucces } from "../actions/user.actions";

// export function* register (auth)
// {
//     const User = {
//         id:0,
//         userName:auth.username,
//         password:auth.password
//     }
//     const response = yield registerNewUser(User);
//     if (response.status === 200) {
//         yield put (registerSuccess());
//     }else {
//         yield put (registerUnsucces());
//     }
// }

export function* login (auth)
{
    const response=yield loginUser(auth);
    if(response.status === 204) {  // ===204 if somethign server return null 
        yield put (loginUnsucces())
    }else {
        yield put (loginSuccess(response)) //print this this func expect user info
    }
}