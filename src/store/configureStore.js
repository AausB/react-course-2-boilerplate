import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// A thunk is a function that wraps an expression to delay its evaluation.
// see: https://github.com/gaearon/redux-thunk
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';

// IMPORTANT: 
// see: https://github.com/zalmoxisus/redux-devtools-extension

// if we use redux dev tools in the browser: window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   otherwise redux comose: see https://redux.js.org/docs/api/compose.html
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer
    }),
    // using redux-thunk as middleware
    composeEnhancers(applyMiddleware(thunk))

    // without redux-thunk:
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
