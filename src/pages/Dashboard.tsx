/* eslint-disable */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import socket, { joinRoom } from '../utils/socket/socket';
import { addNotification, handleNotifications } from '../store/features/notifications/notificationSlice';
import { logout } from '../store/features/auth/authSlice';
import {toast} from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedOut } = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // if (!token) {
    //   navigate('/login');
    //   return;
    // }

    joinRoom(token);

    dispatch(handleNotifications() as any);

    socket.on('passwordExpiry', (data) => {
      dispatch(addNotification(data));
      toast.warning(data);
    });

    return () => {
      socket.off('passwordExpiry');
    };
  }, [navigate, dispatch]);

  useEffect(() => {
    if (isLoggedOut) {
      dispatch(logout());
      navigate('/login');
    }
  }, [isLoggedOut, navigate, dispatch]);

  return (
    <div>
      <h1>Dashboard Page</h1>
    </div>
  );
};

export default Dashboard;


