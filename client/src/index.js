import React from 'react';
import ReactDOM from 'react-dom';
import './App/styles/index.css';
import './App/styles/spinner.css';
import CurrenciesPage from './App/pages/CurrenciesPage';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Red Hat Display', 'sans-serif']
  }
});

ReactDOM.render(<CurrenciesPage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
