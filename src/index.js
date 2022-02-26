import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from 'stores';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App';
import * as serviceWorker from './serviceWorkerRegistration';

const persistor = persistStore(store)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
  
  , document.getElementById('root')
);

serviceWorker.unregister();