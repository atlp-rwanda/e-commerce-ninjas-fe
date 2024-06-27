/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { loadWelcomeMessage } from '../store/features/welcomeSlice';
import { IWelcomeMessage } from '../utils/types/store';
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"


const LandingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const welcomeMessage: IWelcomeMessage = useAppSelector((state) => state.initialMessage.welcomeMessage);

  useEffect(() => {
    dispatch(loadWelcomeMessage());
  }, [dispatch]);

  return (
    <>
      <Header/>
      <main>
      {welcomeMessage.message}
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;