/* eslint-disable*/
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router";
import "./styles/style.scss";
import Sidebar from "./components/sidebar/Sidebar";

const App: React.FC = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default App;
