/* eslint-disable */
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { SignUp } from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import VerifyEmail from "./pages/VerifyEmail";
import { EmailVerifying } from "./pages/EmailVerifying";
import { ResendEmail } from "./components/ResendEmail";
import GoogleCallback from "./components/GoogleCallback";
import SendResetPasswordLink from "./pages/SendResetPasswordLink";
import ResetPassword from "./pages/ResetPassword";
import { GuestRoute, ProtectedRoute } from "./utils/protectRoute/ProtectedRoute";
import ViewProduct from "./pages/ViewProduct";
import Login from "./pages/Login";
import UserViewCart from "./pages/UserViewCart";
import Search from "./pages/Search";
import SellerViewProduct from "./pages/seller/SellerViewProduct";
import SellerCollection from "./pages/seller/SellerCollection";
import { SellerLayout } from "./components/layout/SellerLayout";
import SellerDashboard from "./pages/seller/SellerDashboard";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { OverViewDashboard } from "./pages/admin/OverView";
import Users from "./pages/admin/Users";
import Logout from "./components/layout/Logout";
import UserProfile from "./pages/UserEditProfile";
import ProductsPage from "./pages/Products";
import TrackOrder from "./pages/trackOrder";
import UserViewOrders from "./pages/UserViewOrders";
import ServicesPage from "./pages/ServicesPage";
import { SellerOnboarding } from "./pages/SellerOnboarding";
import { Requests } from "./pages/admin/Requests";
import { ViewRequest } from "./pages/admin/VewRequest";
import { AboutUs } from "./pages/AboutUs";
import { SellerRegistrationPage } from "./pages/seller/SellerRegistrationPage";
import ShopPage from './pages/ShopPage';
import ProductsByShopPage from './pages/ProductsByShopPage';

import { Settings } from "./pages/admin/Settings";
const AppRouter: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={

                <LandingPage />
              
            }
          />
          <Route
            path="/home"
            element={

                <LandingPage />
              
            }
          />
          <Route
            path="/products"
            element={
                <ProductsPage />
            }
          />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/shops" element={<ShopPage />} />
          <Route path="/shops/:shopId/products" element={<ProductsByShopPage />} />
          <Route
            path="signup"
            element={
                <SignUp />
            }
          />
          <Route
            path="login"
            element={
                <Login />
            }
          />
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
          <Route
            path="product/:id"
            element={
                <ViewProduct />
            }
          />
          <Route path="search" element={<Search />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="shopping-cart"
            element={
              <ProtectedRoute allowedRoles={["buyer"]} redirectPath="/login">
                <UserViewCart />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-orders"
            element={
              <ProtectedRoute allowedRoles={["buyer"]} redirectPath="/login">
                <UserViewOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="trackOrder/:orderId/:productId"
            element={
              <ProtectedRoute allowedRoles={["buyer"]} redirectPath="/login">
                <TrackOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile-settings"
            element={
              <ProtectedRoute redirectPath="/login" allowedRoles={["buyer"]}>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/become-seller"
            element={
              <ProtectedRoute allowedRoles={["buyer"]} redirectPath="/login">
                <SellerOnboarding />
              </ProtectedRoute>
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/register/seller" element={<SellerRegistrationPage />} />
          <Route path="*" element={<NotFound redirectPath="/" />} />
        </Route>
        <Route path="/seller" element={
          <ProtectedRoute redirectPath="/login" allowedRoles={["seller"]}><SellerLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="product/:id" element={<SellerViewProduct />} />
          <Route path="products" element={<SellerCollection />} />
        </Route>
        <Route path="/admin">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="*" element={<NotFound redirectPath="/admin" />} />
          <Route path="*" element={<NotFound redirectPath="/admin" />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute redirectPath="/login" allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<OverViewDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="requests" element={<Requests />} />
            <Route path="request/:id" element={<ViewRequest />} />
            <Route path="requests" element={<Requests />} />
            <Route path="request/:id" element={<ViewRequest />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;