/* eslint-disable*/
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { googleAuthCallback } from "../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const GoogleCallback = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { isLoading, isSuccess, isError, message, token } = useAppSelector(
    (state) => state.auth
  );

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const scope = urlParams.get("scope");
  const authuser = urlParams.get("authuser");
  const prompt = urlParams.get("prompt");

  useEffect(() => {
    if (code && scope && authuser && prompt) {
      dispatch(googleAuthCallback({ code, scope, authuser, prompt }));
    } else {
      setError("Invalid authentication parameters.");
    }
  }, [code, scope, authuser, prompt, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("token", token);
      navigate("/");
    }
    if (isError) {
      setError(message);
    }
  }, [isSuccess, isError, message, navigate]);

  return (
    <div className="google-callback">
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "90vh",
            gap: "1rem",
          }}>
          <div className="btn-loading">
            <HashLoader size={150} color="#FF6D18" loading={true} />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
            Authenticating....
          </div>
        </div>
      )}
      {isError && (
        <div
          className="error-message"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            fontSize: "4rem",
          }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default GoogleCallback;
