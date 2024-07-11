/* eslint-disable */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { SignUp } from './pages/SignUp';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import VerifyEmail from './pages/VerifyEmail';
import { EmailVerifying } from './pages/EmailVerifying';
import { ResendEmail } from './components/ResendEmail';
import GoogleCallback from './components/GoogleCallback';
import SendResetPasswordLink from "./pages/SendResetPasswordLink";
import ResetPassword from "./pages/ResetPassword";

import ViewProduct from './pages/ViewProduct';


const AppRouter: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="verify-email" element={<EmailVerifying />} />
          <Route path="resend-email" element={<ResendEmail />} />
          <Route path="/api/auth/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/api/auth/google/callback" element={<GoogleCallback />} />
          <Route path="/reset-password" element={<SendResetPasswordLink />} />
         <Route path="/api/auth/reset-password/:token" element={<ResetPassword />} />
          <Route path="product/:id" element={<ViewProduct />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
