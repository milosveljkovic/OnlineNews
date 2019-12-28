import {combineReducers} from "redux";

import {userReducer} from './reducer/user.reducer'
import { newsReducer } from "./reducer/news.reducer";
import {newsByTagReducer} from './reducer/news-by-tag.reducer'
import { noveltyReducer } from "./reducer/novelty.reducer";

 const rootReducer = combineReducers({
    user:userReducer,
    news:newsReducer,
    news_by_tag:newsByTagReducer,
    novelty:noveltyReducer
})

export default rootReducer;