/* eslint-disable */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { SignUp } from './pages/SignUp';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import VerifyEmail from './pages/VerifyEmail';
import { EmailVerifying } from './pages/EmailVerifying';



const AppRouter: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="verify-email" element={<EmailVerifying />} />
          <Route path="api/auth/verify-email/:token" element={<VerifyEmail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
