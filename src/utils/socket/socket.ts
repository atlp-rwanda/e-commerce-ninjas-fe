/* eslint-disable */
import { io } from 'socket.io-client';

const socket = io('https://e-commerce-ninjas-platform-backend.onrender.com');

export const joinRoom = (token: any) => {
  socket.emit('join', token);
};

export const disconnect = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;