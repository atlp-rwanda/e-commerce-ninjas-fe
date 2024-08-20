/* eslint-disable */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import socket, { joinRoom, disconnect } from '../utils/socket/socket';
import { toast } from 'react-toastify';
import { fetchNotifications } from '../store/features/notifications/notificationSlice';
import "react-toastify/dist/ReactToastify.css";

const useSocket = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {

    if (socket.disconnected) {
      socket.connect();
    }

    joinRoom();

    const handleNotification = (event: string) => {
      toast.success(`${event}`, {
        autoClose: 3000,
      });
      dispatch(fetchNotifications());
    };

    const events = [
      'productAdded',
      'productRemoved',
      'productExpired',
      'productUpdated',
      'productStatusChanged',
      'productBought',
      'passwordChanged',
      'passwordExpiry',
      'UserChangeRole',
      'UserChangeStatus',
      'accountVerified',
      'orderStatusUpdated'
    ];

    events.forEach(event => {
      socket.on(event, () => handleNotification(event));
    });

    return () => {
      events.forEach(event => {
        socket.off(event);
      });
      disconnect();
    };
  }, [dispatch]);

  return null;
};

export default useSocket;
