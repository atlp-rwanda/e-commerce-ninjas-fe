import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import welcomeReducer from './features/welcomeSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    initialMessage: welcomeReducer,
    auth: authReducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
