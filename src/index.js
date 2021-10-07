import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App';
import * as serviceWorker from './serviceWorkerRegistration';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);

serviceWorker.unregister();
