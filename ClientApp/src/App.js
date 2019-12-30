import React from 'react';
import {BrowserRouter as Router,Switch, Route, Link} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {Provider} from 'react-redux';
import routes from './routes'
import rootReducer from './store/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createStore,applyMiddleware } from 'redux';
import { rootSaga } from './store/sagas/root.saga';
import NavigationBar from './components/NavigationBar'
import { requestNews } from './store/actions/news.actions';
import { getNewsByTag } from './store/actions/news-by-tag.actions';
import { getBookmarksByUsername } from './store/actions/bookmarks.actions';
import { requestLikes } from './store/actions/likes.actions';

const sagaMiddleware=createSagaMiddleware();


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
   );

sagaMiddleware.run(rootSaga);

export default class App extends React.Component {
  displayName = App.name

  getRoutes = (routes) =>{
    return routes.map((prop, key) => {
      var page;
      
        return (
          <Route path={prop.path}
            component={prop.component}
            key={key}
          />
        );
    });
  }

  

  render() {

    store.dispatch(requestNews());
    if(localStorage.getItem('username'))
    {
      store.dispatch(requestLikes(localStorage.getItem('username')));
      store.dispatch(getBookmarksByUsername(localStorage.getItem('username')));
    }
    return (
      <Provider store={store}>
        <div>
          <Link to="/home" style={{color: '#ffffff', textDecoration: 'none'}}>
          <div style={{height:'250px', width:"cover", backgroundImage: `url("https://drhadaki.com/wp-content/uploads/2017/12/latest-news-header-w1960h360.jpg")`, backgroundPosition:'center'}} className="">
              {/* <img src="http://www.anratechnologies.com/home/wp-content/uploads/2017/01/news-3.jpg"></img> */}
          </div>
          </Link>
         
            <NavigationBar></NavigationBar>
              <Switch>
                {
                this.getRoutes(routes)
                }
              </Switch>
        </div>
        </Provider>
    );
  }
}
