import {combineReducers} from "redux";

import {userReducer} from './reducer/user.reducer'
import { newsReducer } from "./reducer/news.reducer";
import {newsByTagReducer} from './reducer/news-by-tag.reducer'
import { noveltyReducer } from "./reducer/novelty.reducer";
import { commentReducers } from "./reducer/comments.reducer";
import { bookmarksReducer } from "./reducer/bookmarks.reducer";

 const rootReducer = combineReducers({
    user:userReducer,
    news:newsReducer,
    comments: commentReducers,
    news_by_tag:newsByTagReducer,
    novelty:noveltyReducer,
    bookmarks:bookmarksReducer
})

export default rootReducer;