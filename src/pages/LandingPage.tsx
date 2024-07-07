/* eslint-disable */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { IWelcomeMessage } from '../utils/types/store';
import { loadWelcomeMessage } from '../store/features/welcomeSlice';
import { Meta } from '../components/Meta';

const LandingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const welcomeMessage: IWelcomeMessage = useAppSelector(
    (state) => state.initialMessage.welcomeMessage
  );

  useEffect(() => {
    dispatch(loadWelcomeMessage());
  }, [dispatch]);

  return (
    <>
    <Meta title='Home - E-Commerce Ninjas' />
      <div className="landingPage">
        <h1>{welcomeMessage.message}</h1>
      </div>
      <div className="container__button">
      </div>
    </>
  );
};

export default LandingPage;
