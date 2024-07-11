/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

import { useAppDispatch, useAppSelector } from "../store/store";
import { loginUser } from "../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

function AdminLogin() {
  const [password, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const input: any = useRef(null);

  const dispatch = useAppDispatch();
  const {
    isLoading,
    isError,
    isSuccess,
    isAuthenticated,
    token,
    error,
    message,
  } = useAppSelector((state) => state.auth);

  useEffect(
    function () {
      if (token && isAuthenticated) {
        setEmail("");
        setPassWord("");
        navigate("/admin/dashboard");
      }
    },
    [token, isAuthenticated]
  );

  useEffect(
    function () {
      if (isError) {
        toast.error(error);
      }

      if (isSuccess) {
        toast.success(message);
      }
    },
    [error, isError, isSuccess]
  );

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (!password.trim() || !email.trim()) return;

    await dispatch(loginUser({ email, password }));
  }

  function handleSetIsVisible() {
    input.current.type = input.current.type === "text" ? "password" : "text";
    setIsVisible((isVisible) => !isVisible);
  }

  return (
    <section className="section__login">
      <div className="mini-container login">
        <div className="login__left">
          <p className="login__heading">Admin Dashboard</p>
          <p className="login__text">
            Access the Admin Dashboard to view insightful statistics and manage
            users efficiently.
          </p>
          <img
            src="../assets/images/adminLogin.png"
            alt="login picture"
            className="login__img"
          />
        </div>
        <div className="login__right">
          <header className="login__header">
            <div className="header__logo login__logo">
              <img
                src="../assets/images/logo.png"
                alt="Ecommerce logo"
                className="header__logo__img"
              />
              <p className="header__logo__text">
                e-Commerce <span>Ninjas</span>
              </p>
            </div>
            <p className="login__heading">Welcome back</p>
            <p className="login__secondary">Please login to your account</p>
          </header>
          <form className="login__form form" onSubmit={handleSubmit}>
            <div className="form__group">
              <input
                type="email"
                placeholder="Email"
                className="form__input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="form__group">
              <input
                type="password"
                placeholder="Password"
                className="form__input"
                ref={input}
                value={password}
                onChange={(event) => setPassWord(event.target.value)}
                required
              />
              {isVisible ? (
                <BiSolidHide
                  className="form__icon"
                  onClick={handleSetIsVisible}
                />
              ) : (
                <BiSolidShow
                  className="form__icon"
                  onClick={handleSetIsVisible}
                />
              )}
              <p className="form__text">
                <a href="#" className="form__link">
                  Forgot password
                </a>
              </p>
            </div>
            <button
              className={`btn form__btn${isLoading ? " loading" : ""}`}
              disabled={isLoading}
            >
              <span>{isLoading ? "Loading " : "Login"}</span>
              <PulseLoader size={6} color="#ffe2d1" loading={isLoading} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
