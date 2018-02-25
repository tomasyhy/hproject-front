import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';
import sagas from '../saga';
import _ from 'lodash';
import {saveState, loadState} from "../connectivity/localStorage"
import {routerMiddleware} from 'react-router-redux'
import {BrowserRouter} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducer';

const history = createHistory()

const routerMw = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

function configureStoreProd(initialState) {
  const middlewares = [
    routerMw,
    sagaMiddleware
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );

  store.subscribe(_.throttle(() => {
    saveState({
      auth: store.getState().auth
    });
  }, 1000));

  sagaMiddleware.run(sagas);
  store.close = () => store.dispatch(END);

  return store;
}

function configureStoreDev(initialState) {
  const middlewares = [
    routerMw,
    sagaMiddleware,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducer', () => {
      const nextReducer = require('../reducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  store.subscribe(_.throttle(() => {
    saveState({
      auth: store.getState().auth
    });
  }, 1000));

  sagaMiddleware.run(sagas);
  store.close = () => store.dispatch(END);

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;