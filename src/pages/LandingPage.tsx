/* eslint-disable */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { IWelcomeMessage } from '../utils/types/store';
import { loadWelcomeMessage } from '../store/features/welcomeSlice';

const LandingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const welcomeMessage: IWelcomeMessage = useAppSelector((state) => state.initialMessage.welcomeMessage);

  useEffect(() => {
    dispatch(loadWelcomeMessage());
  }, [dispatch]);

  return (
    <>
      <div className="landingPage">
        <h1>
          {welcomeMessage.message}
        </h1>
      </div>
    </>
  );
};

export default LandingPage;
