/* eslint-disable */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import { Toaster } from 'sonner';


const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <Toaster 
      richColors
      duration={24000} 
      closeButton        
    />
    <App />
  </Provider>

);