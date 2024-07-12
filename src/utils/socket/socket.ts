/* eslint-disable */
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000', {
  withCredentials: true,
});

export const joinRoom = (token: any) => {
  socket.emit('join', token);
};

export default socket;