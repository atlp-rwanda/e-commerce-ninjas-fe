/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../store/store";
import { loginUser } from "../store/features/auth/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

function UserLogin() {
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
      localStorage.setItem("token", token);
    },
    [token]
  );

  useEffect(
    function () {
      if (token && isAuthenticated) {
        setEmail("");
        setPassWord("");
        navigate("/");
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
    <>
      <section className="section__login">
        <div className="mini-container login">
          <div className="login__left">
            <p className="login__heading">
              Login to your account to access our platform
            </p>
            <p className="login__text">
              Simplify your e-commerce account with our user-friendly website.
            </p>
            <img
              src="../assets/images/loginPhoto.png"
              alt="login picture"
              className="login__img"
            />
          </div>
          <div className="login__right">
            <header className="login__header">
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
            <p className="login__separator">or Login with</p>
            <a href="#" className="login__box">
              <FcGoogle className="login__social__icon" />
              <p className="login__social__text">Login with google</p>
            </a>
            <p className="login__register">
              New to e-commerce Ninjas?
              <Link to="/signup" className="login__link">
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserLogin;
