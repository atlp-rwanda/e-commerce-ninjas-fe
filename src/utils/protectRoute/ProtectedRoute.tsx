/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ redirectPath = '/', children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { message, isError } = useAppSelector((state) => state.admin);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      setTimeout(() => {
        setIsAuthenticated(!!token);
        setLoading(false);
      }, 6000);
    };

    checkToken();
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
    return <Navigate to={redirectPath} replace />;
  }
  if (isError && message === 'Not authorized') {
    toast.info('You are not authorized to access this page');
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export {ProtectedRoute};
