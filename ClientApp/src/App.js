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
      store.dispatch(getBookmarksByUsername(localStorage.getItem('username')));
    }
    return (
      <Provider store={store}>
        <div>
          <div style={{height:'250px', backgroundColor:'#1D2984'}} className="text-center pt-5">
          <Link to="/home" style={{color: '#ffffff', textDecoration: 'none'}}>
              <h1 style={{color:'#ffffff', fontSize: '7rem'}}>Online news</h1>
          </Link>
            
          </div>
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
