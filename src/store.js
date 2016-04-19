/**
 Data Flow
 1. you call store.dispatch(action)
 2. redux store calls the reducer function you gave it
    the reducer function will return a new state
 3. root reducer may combine the output of multiple reducers into a single state tree
 4. the redux store saves the complete state tree returned  by the root reducer
 */
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {setState} from './action_creators';

import * as reducers from './reducers';
//import posts from './reducers/posts';
//import users from './reducers/users';

//import {store} from 'react-blogg-shared';

const store = (extraReducers, middleware, location, client) => {

  const reducer = combineReducers({
    ...reducers,
    ...extraReducers
  });

  const createStoreWithMiddleware = applyMiddleware(
    ...middleware,
    thunkMiddleware
  )(createStore);
  const store = createStoreWithMiddleware(reducer);
  return store;
};

export default store;

//export default store(reducers, [reduxRouterMiddleware]);
