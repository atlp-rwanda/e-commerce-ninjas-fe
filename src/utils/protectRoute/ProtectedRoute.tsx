/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';
import { getUserDetails, logout } from '../../store/features/auth/authSlice';

const ProtectedRoute = ({ redirectPath = '/',allowedRoles = [] ,children }) => {
  const [userRole, setUserRole] = useState(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { message, isError } = useAppSelector((state) => state.admin);
  useEffect(() => {
    setTimeout(() => {
    const checkToken = async () => {
      const token = getToken();
      if(token) {
        const res =  await dispatch(getUserDetails(token));
          if (res) {
            setUserRole(res.payload.data.user.role);
            setIsAuthenticated(!!token);
            setLoading(false);
          }else {
            setIsAuthenticated(false);
          }
        }else {
          setIsAuthenticated(false);
          setLoading(false);
        }
        };
        checkToken();
      }, 1000);

  }, []);

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

  if (!isAuthenticated) {
    toast.info('Please log in to access this page.');
    return <Navigate to={redirectPath} replace />;
  }
  if (isError && message === 'Not authorized') {
    toast.info('You are not authorized to access this page');
    return <Navigate to={redirectPath} replace />;
  }
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

const GuestRoute = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() =>{
    const checkToken = async () => {
      const token = getToken();
      if (token) {
        try {
          const resultAction = await dispatch(getUserDetails(token));
          
          if (getUserDetails.fulfilled.match(resultAction)) {
            const userRole = resultAction.payload.user.role;
            setUserRole(userRole);
            setIsAuthenticated(true);
          } else {
            navigate('/login'); 
          }
        } catch (error) {
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };
  
    checkToken();
  },[dispatch,navigate])

  useEffect(() => {
    if (isAuthenticated && userRole) {
      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'seller') {
        navigate('/seller');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  return <Outlet />;
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

export { ProtectedRoute, storeTokenWithExpiration, getToken,GuestRoute };
