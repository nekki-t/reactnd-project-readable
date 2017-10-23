import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { logger } from 'redux-logger'
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (initialState = {}) => (
  createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk, logger)
    )
  )
);



