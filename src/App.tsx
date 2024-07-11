/* eslint-disable */
import React from 'react';
import "./App.scss"
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router';

const App: React.FC = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default App;
