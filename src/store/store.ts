/* eslint-disable  */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import welcomeReducer from './features/welcomeSlice';
import authReducer from './features/auth/authSlice';
import notificationReducer from './features/notifications/notificationSlice';

export const store = configureStore({
  reducer: {
    initialMessage: welcomeReducer,
    auth: authReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
