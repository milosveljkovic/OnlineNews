import React from 'react';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {Provider} from 'react-redux';
import routes from './routes'
import rootReducer from './store/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createStore,applyMiddleware } from 'redux';
import { rootSaga } from './store/sagas/root.saga';
import NavigationBar from './components/NavigationBar'

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
      if(prop.component.WrappedComponent){
        page=prop.component.WrappedComponent
      }else {
        page=prop.component
      }
        return (
          <Route path={prop.path}
            component={page}
            key={key}
          />
        );
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div>
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
