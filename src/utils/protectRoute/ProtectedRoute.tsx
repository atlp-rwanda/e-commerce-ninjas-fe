/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getUserDetails, logout } from '../../store/features/auth/authSlice';

const ProtectedRoute = ({ redirectPath = '/', allowedRoles = [], children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state)=>state.auth)
  useEffect(() => {
    const authenticateUser = async () => {
      const token = getToken();
      if (token) {
        try {
          const res = await dispatch(getUserDetails(token));
          if (res) {
            setUserRole(res.payload.data.user.role);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Failed to decode token:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    authenticateUser();
  }, [dispatch]);

  if (loading) {
    return (
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        open={true}
      >
        <CircularProgress sx={{ color: '#ff8a46' }} />
        <Box mt={2}>
          <Typography variant="h6" sx={{ color: '#112a46' }}>
            Please wait...
          </Typography>
        </Box>
      </Backdrop>
    );
  }

  // Allow guests to access home, login, and signup pages
  if (isAuthenticated === false) {
    if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
      return children ? children : <Outlet />;
    } else {
      toast.info('Please log in to access this page.');
      return <Navigate to={redirectPath} replace />;
    }
  }

  // Prevent authenticated users from accessing login and signup pages
  if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
    toast.info('You are already logged in.');
    return <Navigate to="/" replace />;
  }

  // Check if the authenticated user has the allowed role
  if (allowedRoles.length && !allowedRoles.includes(userRole)) {
    if (isAuthenticated && (userRole === 'admin' || userRole === 'seller')) {
      dispatch(logout());
      toast.info('You have been logged out due to insufficient permissions.');
      return <Navigate to={redirectPath} replace />;
    } else {
      toast.info('You do not have permission to access that page.');
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children ? children : <Outlet />;
};

const storeTokenWithExpiration = (token) => {
  const expirationTimeInMs = 28 * 60 * 60 * 1000; // 28 hours
  const expirationTime = Date.now() + expirationTimeInMs;
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('tokenExpiration', expirationTime.toString());
};

const getToken = () => {
  const token = sessionStorage.getItem('token');
  const expirationTime = sessionStorage.getItem('tokenExpiration');

  if (token && expirationTime) {
    const now = Date.now();
    if (now < parseInt(expirationTime)) {
      return token;
    } else {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('tokenExpiration');
      toast.info("Token has expired. Please log in again.");
      return null;
    }
  }

  return null;
};

export { ProtectedRoute, storeTokenWithExpiration, getToken };
