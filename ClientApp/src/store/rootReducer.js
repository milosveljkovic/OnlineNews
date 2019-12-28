import {combineReducers} from "redux";

import {userReducer} from './reducer/user.reducer'
import { newsReducer } from "./reducer/news.reducer";
import {newsByTagReducer} from './reducer/news-by-tag.reducer'

 const rootReducer = combineReducers({
    user:userReducer,
    news:newsReducer,
    news_by_tag:newsByTagReducer
})

export default rootReducer;