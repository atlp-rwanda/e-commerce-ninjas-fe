/* eslint-disable */
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import LiveChat from "../live-chat/LiveChat";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <LiveChat /> */}
      <Footer />
    </>
  );
}
