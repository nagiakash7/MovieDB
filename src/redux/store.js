// src/redux/store.js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer';
import promiseMiddleware from 'redux-promise-middleware';

const store = createStore(rootReducer, applyMiddleware(promiseMiddleware));

export default store;
