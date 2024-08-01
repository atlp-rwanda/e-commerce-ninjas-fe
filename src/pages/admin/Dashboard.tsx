/* eslint-disable */
import React, { useEffect, useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import Header from "../../components/layout/AdminHeader";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logout } from "../../store/features/auth/authSlice";
import { toast } from "react-toastify";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { Meta } from "../../components/Meta";
import useAdminAuthCheck from "../../hooks/useAdminAuthCheck";

export const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAdminAuthCheck();
  const { isLoading, message, isError } = useAppSelector(
    (state) => state.admin
  );

  const [isActive, setIsActive] = useState(() => {
    return parseInt(localStorage.getItem("activeTab")) || 1;
  });
  const navigate = useNavigate();

  const handleClick = (index: number, path: string) => {
    setIsActive(index);
    localStorage.setItem("activeTab", String(index));
    setTimeout(() => {
      navigate(path);
    }, 1000);
  };

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    if (isError && message === "Not authorized") {
      toast.info("You are not authorized to access this page");
      navigate("/login");
      return;
    }
  }, [isError, message, navigate]);

  return (
    <>
      <Meta title="Admin - Dashboard" />
      <div className="admin__wrapper">
        <section className="left__side">
          <div className="icons">
            <div className="upper">
              <div className="dashboard">
                <div className="icon">
                  <AiFillDashboard
                    size={32}
                    className="icon"
                    onClick={() => handleClick(1, "/admin/dashboard")}
                  />
                </div>
                <div className="icons__title__link">
                  <Link
                    to="/admin/dashboard"
                    className={`text_content ${isActive === 1 ? "active" : ""}`}
                    onClick={() => handleClick(1, "/admin/dashboard")}
                  >
                    Admin Dashboard
                  </Link>
                </div>
              </div>
              <div className="users">
                <div className="icon">
                  <FaUsers
                    size={32}
                    className="icon"
                    onClick={() => handleClick(2, "/admin/users")}
                  />
                </div>
                <div className="icons__title__link">
                  <Link
                    to="users"
                    className={`text_content ${isActive === 2 ? "active" : ""}`}
                    onClick={() => handleClick(2, "/admin/dashboard/users")}
                  >
                    Users
                  </Link>
                </div>
              </div>
            </div>
            <div className="logout">
              <div className="icon">
                <IoLogOutSharp
                  size={32}
                  className="icon"
                  onClick={handleLogout}
                />
              </div>
              <div className="icons__title__link">
                <h2
                  className={`text_content ${isActive === 3 ? "active" : ""}`}
                  onClick={handleLogout}
                >
                  Logout
                </h2>
              </div>
            </div>
          </div>
        </section>
        <section className="main__content__dashboard">
          <Header />
          <main className="main__dashboard">
            <Outlet />
          </main>
        </section>
      </div>
    </>
  );
};
