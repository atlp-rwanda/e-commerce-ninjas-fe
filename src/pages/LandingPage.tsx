/* eslint-disable */

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { loadWelcomeMessage } from "../store/features/welcomeSlice";
import { IWelcomeMessage } from "../utils/types/store";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "../styles/LandingPage.scss";
import SearchInput from "../components/inputs/SearchInput";
import Sidebar from "../components/sidebar/Sidebar";
import AdminHeader from "../components/layout/AdminHeader";
import SellerHeader from "../components/layout/SellerHeader";

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
      <AdminHeader />
      <SellerHeader />
      <Header />
      <div className="landingPage">
        <h1>{welcomeMessage.message}</h1>
      </div>
      <div className="container__button">
        <SearchInput />
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
