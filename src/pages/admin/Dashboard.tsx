/* eslint-disable */
import React, { useEffect, useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { IoLogOutSharp, IoSettingsSharp } from "react-icons/io5";
import Header from "../../components/layout/AdminHeader";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logout } from "../../store/features/auth/authSlice";
import { toast } from "react-toastify";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { Meta } from "../../components/Meta";
import useAdminAuthCheck from "../../hooks/useAdminAuthCheck";
import { disconnect } from "../../utils/socket/socket";
import { RiFileList3Fill } from "react-icons/ri";

export const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  // const isAuthorized = useAdminAuthCheck();
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
    disconnect();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    if (isError && message === "Not authorized") {
      toast.info("You are not authorized to access this page");
      navigate("/login");
      return;
    }
  }, [isError, message, navigate]);

  const menuItems = [
    {
      icon: <AiFillDashboard size={32} />,
      title: "Dashboard",
      path: "/admin/dashboard",
      index: 1,
    },
    {
      icon: <FaUsers size={32} />,
      title: "Users",
      path: "/admin/dashboard/users",
      index: 2,
    },
    {
      icon: <RiFileList3Fill size={32} />,
      title: "Requests",
      path: "/admin/dashboard/Requests",
      index: 3,
    }, {
      icon: <IoSettingsSharp size={32} />,
      title: "Settings",
      path: "/admin/dashboard/settings",
      index: 4,
    },
  ];

  return (
    <>
      <Meta title="Admin - Dashboard" />
      <div className="admin__wrapper">
        <section className="left__side">
          <div className="icons">
            <div className="upper">
              {menuItems.map((item) => (
                <div key={item.index} className="menu__item">
                  <div className="icon" onClick={() => handleClick(item.index, item.path)}>
                    {item.icon}
                  </div>
                  <div className="icons__title__link">
                    <Link
                      to={item.path}
                      className={`text_content ${isActive === item.index ? "active" : ""}`}
                      onClick={() => handleClick(item.index, item.path)}
                    >
                      {item.title}
                    </Link>
                  </div>
                </div>
              ))}
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
                  className={`text_content ${isActive === 5 ? "active" : ""}`}
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
