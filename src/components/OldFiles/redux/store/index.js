import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import sessionReducer from 'components/OldFiles/redux/reducers/index';

const sessionStore = createStore(sessionReducer, applyMiddleware(createLogger()));

export default sessionStore;