/* eslint-disable */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import { ToastContainer } from'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);