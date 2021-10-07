import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/index';

export default createStore(rootReducer, applyMiddleware(createLogger()));