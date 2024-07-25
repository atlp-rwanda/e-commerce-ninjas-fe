/* eslint-disable */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { SignUp } from './pages/SignUp';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import VerifyEmail from './pages/VerifyEmail';
import { EmailVerifying } from './pages/EmailVerifying';
import { ResendEmail } from './components/ResendEmail';
import GoogleCallback from './components/GoogleCallback';
import SendResetPasswordLink from './pages/SendResetPasswordLink';
import ResetPassword from './pages/ResetPassword';

import ViewProduct from './pages/ViewProduct';
import UserLogin from './pages/UserLogin';
import SellerLogin from './pages/SellerLogin';
import AdminLogin from './pages/AdminLogin';
import UserViewCart from './pages/UserViewCart';
import Search from "./pages/Search";
import SellerViewProduct from "./pages/seller/SellerViewProduct";
import SellerCollection from "./pages/seller/SellerCollection";
import { SellerLayout } from "./components/layout/SellerLayout";
import SellerDashboard from "./pages/seller/SellerDashboard";
import Logout from './components/layout/Logout';
const AppRouter: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="/seller">
         <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="login" element={<SellerLogin />} />
          </Route>
          <Route path="/admin">
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="login" element={<AdminLogin />} />
          </Route>
          <Route path="verify-email" element={<EmailVerifying />} />
          <Route path="resend-email" element={<ResendEmail />} />
          <Route
            path="/api/auth/verify-email/:token"
            element={<VerifyEmail />}
          />
          <Route
            path="/api/auth/google/callback"
            element={<GoogleCallback />}
          />
          <Route path="/reset-password" element={<SendResetPasswordLink />} />
          <Route
            path="/api/auth/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route path="product/:id" element={<ViewProduct />} />
          <Route path="search" element={<Search/>}/>
          <Route path="logout" element={<Logout />} />
          <Route path="shopping-cart" element={<UserViewCart />} />
         <Route path="*" element={<NotFound />} />
            <Route path="seller/login" element={<SellerLogin />} />
        </Route>
        <Route path="/seller" element={<SellerLayout/>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="product/:id" element={<SellerViewProduct />} />
            <Route path="products" element={<SellerCollection />} />
          </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;