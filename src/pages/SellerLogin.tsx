/* eslint-disable */
import React, { useEffect, useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/store";
import { loginUser, getUserDetails, resetAuth } from "../store/features/auth/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useFormik } from "formik";
import * as Yup from "yup";
import authService from "../store/features/auth/authService";
import { joinRoom } from '../utils/socket/socket';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email must be valid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function SellerLogin() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const callbackUrl = queryParams.get('callbackUrl');
  const [isClicked, setIsClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [badUser, setBadUser] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {
    isLoading,
    isError,
    isSuccess,
    isAuthenticated,
    token,
    error,
    message,
    user
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

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  useEffect(() => {
    async function checkAuth() {
      if (token) {
        await dispatch(getUserDetails(token));
      }
      setIsChecking(false);
    }

    checkAuth();
  }, [dispatch, token]);

  useEffect(() => {
    if (!isChecking && isSuccess && isAuthenticated) {
      if (user && (user as any).role !== "seller") {
        setBadUser(true);
        dispatch(resetAuth());
        return;
      }
      localStorage.setItem("token", token);
      {message && toast.success(message)}
      navigate(callbackUrl || "/seller/dashboard");
      formik.resetForm();
      joinRoom(token);
    }
  }, [isChecking, isSuccess, token, isAuthenticated, user, navigate, callbackUrl, message, dispatch]);

  useEffect(() => {
    if (!isChecking && isAuthenticated && user && (user as any).role === 'seller') {
      navigate(callbackUrl || "/seller/dashboard");
    }
  }, [isChecking, isAuthenticated, user, navigate, callbackUrl]);

  function handleIsFocused() {
    setIsFocused(true);
    setIsClicked(false);
  }

  function handleIsVisible() {
    setIsVisible((isVisible) => !isVisible);
  }

  if (isChecking) {
    return <PulseLoader size={10} color="#007bff" />;
  }

  return (
    <section className="section__login">
      <div className="mini-container login">
        <div className="login__left">
          <p className="login__heading">
            Simplify management with our dashboard.
          </p>
          <p className="login__text">
            Simplify your e-commerce management with our user-friendly seller
            dashboard.
          </p>
          <img
            src="../assets/images/sellerLogin.png"
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
                value={formik.values.email}
                onChange={formik.handleChange}
                onFocus={() => setIsClicked(false)}
                onBlur={formik.handleBlur}
              />
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
                onBlur={formik.handleBlur}
              />
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
            {badUser && (<p className="error">You must login as a seller</p>)}
            {formik.touched.email && formik.errors.email ? (
              <p className="error">{formik.errors.email}</p>
            ) : formik.touched.password && formik.errors.password ? (
              <p className="error">{formik.errors.password}</p>
            ) : isError && isClicked ? (
              <p className="error">{error}</p>
            ) : null}
            <button
              type="submit"
              className={`btn form__btn${isLoading ? " loading" : ""}`}
              disabled={isLoading}
              onClick={() => setIsClicked(true)}
            >
              <span>{isLoading ? "Loading " : "Login"}</span>
              <PulseLoader size={6} color="#ffe2d1" loading={isLoading} />
            </button>
          </form>
          <p className="login__separator">or Login with</p>
          <div className="login__box" onClick={authService.googleAuth}>
            <FcGoogle className="login__social__icon" />
            <p className="login__social__text">Login with google</p>
          </div>
          <p className="login__register">
            New to e-commerce Ninjas?{" "}
            <a href="#" className="login__link">
              Register
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SellerLogin;