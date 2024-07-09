/* eslint-disable*/
/* eslint-disable arrow-body-style */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SingleProduct from './pages/SingleProduct';
import User from './User';

const AppRouter: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<User />} >
          <Route path="" element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="product/:id" element={<SingleProduct />} />
          <Route path="*" element={<NotFound />} />
        </Route>
  
      </Routes>
    </div>
  );
};

export default AppRouter;

