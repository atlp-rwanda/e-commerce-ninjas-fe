/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

import { useAppDispatch, useAppSelector } from "../store/store";
import { loginUser } from "../store/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function AdminLogin() {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const inputEl = useRef(null);

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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(
    function () {
      if (isSuccess && isAuthenticated && token) {
        localStorage.setItem("token", token);
        toast.success(message);
        navigate("/admin/dashboard");
        formik.resetForm();
      }
    },
    [token, isAuthenticated, error, isError, isSuccess]
  );

  function handleIsFocused() {
    setIsFocused(true);
  }

  function handleIsVisible() {
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
          <form className="login__form form" onSubmit={formik.handleSubmit}>
            <div className="form__group">
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                className="form__input"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="error">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="form__group">
              <input
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                className="form__input"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onFocus={handleIsFocused}
                value={formik.values.password}
                ref={inputEl}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="error">{formik.errors.password}</p>
              ) : null}
              {isFocused ? (
                isVisible ? (
                  <BiSolidShow
                    className="form__icon"
                    onClick={handleIsVisible}
                  />
                ) : (
                  <BiSolidHide
                    className="form__icon"
                    onClick={handleIsVisible}
                  />
                )
              ) : (
                ""
              )}
              <p className="form__text">
                <Link to="/reset-password" className="form__link">
                  Forgot password
                </Link>
              </p>
            </div>
            {isError && <p className="error">{error}</p>}
            <button
              type="submit"
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
