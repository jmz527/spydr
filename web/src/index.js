// Main Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// Custom Imports
import store from './store';
import App from './containers/app.js';
import ErrorBoundary from '~/hoc/ErrorBoundary';

// Style Imports
import '~/style/main.css';
import '~/style/spectre.min.css';

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary><App /></ErrorBoundary>
    </BrowserRouter>
  </Provider>
);

const rootSelector = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(app, rootSelector);
});
