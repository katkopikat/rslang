import React from 'react';
import ReactDOM from 'react-dom';
import './assets/gilroy.css';
import './index.scss';
import { Provider } from 'react-redux';
import App from './components/App/App';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
