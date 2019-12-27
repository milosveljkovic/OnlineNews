import {combineReducers} from "redux";

import {userReducer} from './reducer/user.reducer'
import { newsReducer } from "./reducer/news.reducer";

 const rootReducer = combineReducers({
    user:userReducer,
    news:newsReducer
})

export default rootReducer;