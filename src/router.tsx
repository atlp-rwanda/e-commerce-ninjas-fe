/* eslint-disable*/
/* eslint-disable*/
/* eslint-disable arrow-body-style */
import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";

const AppRouter: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  );
};

export default AppRouter;

