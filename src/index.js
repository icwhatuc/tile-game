import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import App from './containers/AppConnector';
import middleware from './middleware';

const {logger} = middleware;
let store = createStore(
  reducer
  , applyMiddleware(thunk, logger)
);

const MOUNT_NODE = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE
)

