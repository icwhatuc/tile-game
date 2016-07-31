import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import reducers from './reducers'
import App from './containers/AppConnector'

let store = createStore(reducers);

const MOUNT_NODE = document.getElementById('root')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE
)


