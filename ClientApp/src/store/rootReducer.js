import {combineReducers} from "redux";

import {userReducer} from './reducer/user.reducer'
import { newsReducer } from "./reducer/news.reducer";
import {newsByTagReducer} from './reducer/news-by-tag.reducer'
import { noveltyReducer } from "./reducer/novelty.reducer";
import { commentReducers } from "./reducer/comments.reducer";

 const rootReducer = combineReducers({
    user:userReducer,
    news:newsReducer,
    novelty:noveltyReducer,
    comments: commentReducers,
    news_by_tag:newsByTagReducer,
    novelty:noveltyReducer
})

export default rootReducer;