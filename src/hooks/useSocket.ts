/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket, { joinRoom } from '../utils/socket/socket';
import { addNotification, checkPasswordExpiryAndLogout, handleNotifications } from '../store/features/notifications/notificationSlice';
import { toast } from 'react-toastify';
import { AppDispatch } from '../store/store';
import { logout } from '../store/features/auth/authSlice';
import "react-toastify/dist/ReactToastify.css";

const useSocket = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    joinRoom(token);

    dispatch(handleNotifications() as any).then((notifications: any) => {
      dispatch(checkPasswordExpiryAndLogout(notifications));
    });

    socket.on('passwordExpiry', (data) => {
      dispatch(addNotification(data));
      toast.warning(data, {
        autoClose: 30000,    
      });
      if (data.includes('your password has expired')) {
        localStorage.removeItem('token');
        dispatch(logout());
      }
    });

    return () => {
      socket.off('passwordExpiry');
    };
  }, [dispatch]);

  return null;
};

export default useSocket;
