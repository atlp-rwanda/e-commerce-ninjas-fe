/* eslint-disable */
import { io } from 'socket.io-client';

const socket = io('https://e-commerce-ninjas-platform-backend.onrender.com', {
  withCredentials: true,
});

export const joinRoom = (token: any) => {
  socket.emit('join', token);
};

export default socket;