/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import NotFound from './pages/NotFound';

const AppRouter: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default AppRouter;
