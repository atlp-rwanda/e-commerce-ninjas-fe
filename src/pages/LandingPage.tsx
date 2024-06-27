/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { loadWelcomeMessage } from '../store/features/welcomeSlice';
import { IWelcomeMessage } from '../utils/types/store';

const LandingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const welcomeMessage: IWelcomeMessage = useAppSelector((state) => state.initialMessage.welcomeMessage);

  useEffect(() => {
    dispatch(loadWelcomeMessage());
  }, [dispatch]);

  return (
    <div>
      {welcomeMessage.message}
    </div>
  );
};

export default LandingPage;
