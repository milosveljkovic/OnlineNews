import {combineReducers} from "redux";

import {userReducer} from './reducer/user.reducer'
import { newsReducer } from "./reducer/news.reducer";
import { noveltyReducer } from "./reducer/novelty.reducer";

 const rootReducer = combineReducers({
    user:userReducer,
    news:newsReducer,
    novelty:noveltyReducer
})

export default rootReducer;