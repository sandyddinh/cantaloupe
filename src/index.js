import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router';
import 'bootstrap/scss/bootstrap.scss';
import 'babel-polyfill';

const app = document.getElementById('app');

ReactDOM.render(<AppRouter />, app);
