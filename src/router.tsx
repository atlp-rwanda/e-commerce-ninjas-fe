/* eslint-disable*/
/* eslint-disable arrow-body-style */
import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import VerifyOtp from "./pages/VerifyOtp";

const AppRouter: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
