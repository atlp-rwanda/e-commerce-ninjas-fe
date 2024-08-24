/* eslint-disable */
import React, { useState, useEffect } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaProductHunt, FaRegUser } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import SellerHeader from "./SellerHeader";
import useSellerAuthCheck from "../../hooks/useSellerAuthCheck";
import { logout } from "../../store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { PuffLoader } from "react-spinners";
import { disconnect } from "../../utils/socket/socket";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SellerSideProduct from "../product/SellerSideProduct";
import { fetchSellerCollectionProduct } from "../../store/features/product/sellerCollectionProductsSlice";
import { Empty } from "antd";
import LiveChat from "../live-chat/LiveChat";

export const SellerLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, isError, OrderHistory } = useAppSelector(
    (state) => state.sellerCollectionProducts
  );
  const [completedOrder, setCompletedOrder] = useState(0);

  useEffect(() => {
    dispatch(fetchSellerCollectionProduct());
  }, [dispatch]);

  useEffect(() => {
    if (OrderHistory !== null) {
      setCompletedOrder(80);
    } else {
      setCompletedOrder(0);
    }
  }, [OrderHistory]);

  const handleLogout = () => {
    dispatch(logout());
    disconnect();
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  // if (!isAuthorized) {
  //   return (
  //     <div className="seller-loading">
  //       <PuffLoader color="#ff6d18" size={300} loading={true} />
  //     </div>
  //   );
  // }

  function formatName(name: string) {
    const trimmedName = name?.trim();
    const formattedName = trimmedName?.replace(/\s+/g, ".");
    return formattedName?.length > 8
      ? formattedName?.substring(0, 8) + "..."
      : formattedName;
  }

  const availableProducts = data.products
    ?.filter((product) => product?.status === "available")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return "#57ce57";
    if (percentage >= 50) return "#FFFF00";
    return "#FF0000"; // Red
  };

  const progressBarColor = getCompletionColor(completedOrder);

  return (
    <>
      <div className="seller__wrapper">
        <section className="left__side">
          <div className="icons__side">
            <div className="icons">
              <div className="icons__upper">
                <div>
                  <Link to={"/seller/dashboard"}>
                    <AiFillDashboard size={32} className="icon" />
                  </Link>
                </div>
                <div>
                  <Link to={"/seller/products"}>
                    <FaProductHunt size={32} className="icon" />
                  </Link>
                </div>
              </div>
              <div className="icons__bottom">
                <IoLogOutSharp
                  size={32}
                  className="icon"
                  onClick={handleLogout}
                />
              </div>
            </div>
          </div>
          <div className="dashboard__items">
            <div className="dashboard__side">
              <div className="dashboard__links">
                <div>
                  <Link
                    to={"/seller/dashboard"}
                    className={`text_content ${
                      pathname === "/seller/dashboard" ? "active" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                </div>
                <div>
                  <Link
                    to={"/seller/products"}
                    className={`text_content ${
                      pathname.startsWith("/seller/product") ? "active" : ""
                    }`}
                  >
                    Products
                  </Link>
                </div>
              </div>
              <div className="dashboard__lower__link">
                <h2 className="text_content" onClick={handleLogout}>
                  Logout
                </h2>
              </div>
            </div>
          </div>
        </section>
        <section className="main__seller__content__dashboard">
          <SellerHeader />
          <main className="main__seller__dashboard">
            <div className="outlet">
              <Outlet />
            </div>
            <section className="right__side">
              <div className="right-profile">
                {user && user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt="Profile"
                    className="profile-image"
                  />
                ) : (
                  <FaRegUser className="profile-image" />
                )}
                <span className="profile-name">
                  {user
                    ? formatName(user?.firstName || user?.email.split("@")[0])
                    : "Account"}
                </span>
                <IconButton className="profile-edit">
                  Edit Profile
                  <EditIcon className="icon-edit" />
                </IconButton>
                <div className="progress-bar-container">
                  Order Completed:{" "}
                  <span
                    className="order-progress"
                    style={{ color: `${getCompletionColor(completedOrder)}` }}
                  >
                    {completedOrder}%
                  </span>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${completedOrder}%`,
                        backgroundColor: progressBarColor,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="right-products">
                <p className="right-header">Recent Products</p>
                <div className="product-header">
                  <p>No</p>
                  <p>Product Name</p>
                  <p>Status</p>
                </div>
                {isLoading ? (
                  <div className="loader">
                    <PuffLoader color="#ff6d18" size={25} loading={isLoading} />
                  </div>
                ) : isError ? (
                  <div>
                    <p>something went wrong</p>
                  </div>
                ) : availableProducts?.length > 0 ? (
                  availableProducts?.map((product, index) => (
                    <SellerSideProduct
                      key={product.id}
                      number={index + 1}
                      image={product.images[0]}
                      title={product.name}
                      availability="available"
                    />
                  ))
                ) : (
                  <div>
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={"NO Products"}
                    />
                  </div>
                )}
              </div>
            </section>
          </main>
        </section>
      </div>

      <LiveChat />
    </>
  );
};
