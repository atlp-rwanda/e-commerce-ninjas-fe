/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { logout } from "../../store/features/auth/authSlice";
import { PuffLoader } from "react-spinners";
import { disconnect } from '../../utils/socket/socket';

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performLogout = async () => {
      await dispatch(logout());
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("tokenExpiration")
      disconnect();
      setLoading(false);
      navigate("/");
    };

    performLogout();
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <PuffLoader color="#ff6d18" size={300} />
      </div>
    );
  }

  return null;
};

export default Logout;
