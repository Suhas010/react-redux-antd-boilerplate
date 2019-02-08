/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers/index';

// added for redux developer tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk, promise)));

export default store;
