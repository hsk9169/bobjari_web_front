import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { sessionStore } from 'stores';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App';
import * as serviceWorker from './serviceWorkerRegistration';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={sessionStore}>
      <App />
    </Provider>
  </BrowserRouter>
  
  , document.getElementById('root')
);

serviceWorker.unregister();