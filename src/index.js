import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import App from './component/index';
import store from './container/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById('root')
 );